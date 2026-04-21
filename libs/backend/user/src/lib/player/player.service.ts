import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player, PlayerDocument } from './player.schema';
import { CreatePlayerDto, UpdatePlayerDto } from '@avans-nx-workshop/backend/dto';

@Injectable()
export class PlayerService {
  private readonly logger = new Logger(PlayerService.name);

  constructor(@InjectModel(Player.name) private playerModel: Model<PlayerDocument>) {}

  async findAll(): Promise<Player[]> {
    this.logger.log('Fetching all players');
    return this.playerModel.find().lean().exec();
  }

  // D3: query operators - $in, $gte, $lte
  async search(filters: {
    position?: string;   // kommagescheiden: "ST,RW,LW"
    clubId?: string;
    minGoals?: number;
    maxGoals?: number;
    sortBy?: 'goals' | 'assists';
    order?: 'asc' | 'desc';
  }): Promise<Player[]> {
    this.logger.log(`Searching players with filters: ${JSON.stringify(filters)}`);
    const query: Record<string, any> = {};

    if (filters.position) {
      const positions = filters.position.split(',').map(p => p.trim()).filter(Boolean);
      // $in operator: meerdere posities tegelijk filteren
      query['position'] = positions.length === 1 ? positions[0] : { $in: positions };
    }

    if (filters.clubId) {
      query['clubId'] = filters.clubId;
    }

    // $gte en $lte voor goals range
    if (filters.minGoals !== undefined || filters.maxGoals !== undefined) {
      query['goals'] = {};
      if (filters.minGoals !== undefined) query['goals']['$gte'] = Number(filters.minGoals);
      if (filters.maxGoals !== undefined) query['goals']['$lte'] = Number(filters.maxGoals);
    }

    const sort: Record<string, 1 | -1> = {};
    if (filters.sortBy) {
      sort[filters.sortBy] = filters.order === 'asc' ? 1 : -1;
    }

    return this.playerModel.find(query).sort(sort).lean().exec();
  }

  // D2: aggregate pipeline - top scorers gesorteerd op goals + assists
  async getTopScorers(limit = 10): Promise<any[]> {
    this.logger.log(`Fetching top ${limit} scorers via aggregate`);
    return this.playerModel.aggregate([
      { $match: { goals: { $gt: 0 } } },
      { $sort: { goals: -1, assists: -1 } },
      { $limit: Number(limit) },
      { $project: {
        _id: 1,
        firstName: 1,
        lastName: 1,
        position: 1,
        clubId: 1,
        goals: 1,
        assists: 1,
      }},
    ]).exec();
  }

  async findOne(id: string): Promise<Player | null> {
    this.logger.log(`Fetching player with ID: ${id}`);
    return this.playerModel.findById(id).lean().exec();
  }

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    this.logger.log(`Creating player: ${createPlayerDto.firstName} ${createPlayerDto.lastName}`);
    const newPlayer = new this.playerModel(createPlayerDto);
    return newPlayer.save();
  }

  async update(id: string, updatePlayerDto: UpdatePlayerDto): Promise<Player | null> {
    this.logger.log(`Updating player with ID: ${id}`);
    return this.playerModel.findByIdAndUpdate(id, updatePlayerDto, { new: true }).lean().exec();
  }

  async remove(id: string): Promise<void> {
    this.logger.log(`Deleting player with ID: ${id}`);
    await this.playerModel.findByIdAndDelete(id).exec();
  }
  
  async findByClub(clubId: string): Promise<Player[]> {
    this.logger.log(`Fetching players for club with ID: ${clubId}`);
    return this.playerModel.find({ clubId: clubId }).lean().exec();
  }

  async getPlayerStats(playerId: string): Promise<{ goals: number; assists: number }> {
    const player = await this.playerModel.findById(playerId).lean().exec();
    if (!player) {
      throw new NotFoundException('Speler niet gevonden');
    }
    return {
      goals: player.goals,
      assists: player.assists,
    };
  }

  async incrementGoals(playerId: string, numberOfGoals: number): Promise<void> {
    await this.playerModel.findByIdAndUpdate(playerId, { $inc: { goals: numberOfGoals } });
  }

  async incrementAssists(playerId: string, numberOfAssists: number): Promise<void> {
    await this.playerModel.findByIdAndUpdate(playerId, { $inc: { assists: numberOfAssists } });
  }
}