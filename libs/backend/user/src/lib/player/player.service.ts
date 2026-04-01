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