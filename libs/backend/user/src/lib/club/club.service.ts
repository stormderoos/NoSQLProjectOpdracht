import { HttpException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Club as ClubModel, ClubDocument } from './club.schema';
import { IFindClub, ICreateClub } from '@avans-nx-workshop/shared/api';
import { CreateClubDto, UpdateClubDto } from '@avans-nx-workshop/backend/dto';
import { PlayerDocument, Player } from '../player/player.schema';
import { IFindPlayer } from '@avans-nx-workshop/shared/api';
import { Match, MatchDocument } from '../match/match.schema';


@Injectable()
export class ClubService {
  private readonly logger: Logger = new Logger(ClubService.name);

  constructor(
    @InjectModel(ClubModel.name) private clubModel: Model<ClubDocument>,
    @InjectModel(Player.name) private playerModel: Model<PlayerDocument>, 
    @InjectModel(Match.name) private matchModel: Model<MatchDocument>,
  ) {}

  async findAll(): Promise<IFindClub[]> {
    this.logger.log(`Finding all clubs`);
    return this.clubModel.find().lean().exec();
  }

  async findOne(_id: string): Promise<IFindClub | null> {
    this.logger.log(`Finding club with id ${_id}`);
    
    const club = await this.clubModel.findOne({ _id }).lean().exec();

    if (!club) {
      this.logger.debug(`Club with id ${_id} not found`);
      throw new NotFoundException(`Club with id ${_id} not found`);
    }
    return club;
  }

  async create(club: CreateClubDto): Promise<ICreateClub> {
    this.logger.log(`Creating club ${club.name}`);
  
    const players = await this.playerModel.find({ _id: { $in: club.players } }).lean().exec();
    for (const player of players) {
      if (player.clubId && player.clubId !== '') {
        throw new HttpException(`Speler ${player.firstName} ${player.lastName} zit al in een andere club`, 400);
      }
    }
  
    const createdClub = new this.clubModel(club); 
    const savedClub = await createdClub.save();
    return savedClub.toObject();
  }

  async update(_id: string, club: UpdateClubDto): Promise<IFindClub | null> {
    this.logger.log(`Updating club with id ${_id}`);
  
    const players = await this.playerModel.find({ _id: { $in: club.players } }).lean().exec();
    for (const player of players) {
      if (player.clubId && player.clubId !== _id) {
        throw new HttpException(`Speler ${player.firstName} ${player.lastName} zit al in een andere club`, 400);
      }
    }
  
    return this.clubModel
      .findByIdAndUpdate(_id, club, { new: true })
      .lean()
      .exec();
  }

  
  async delete(_id: string): Promise<IFindClub | null> {
    this.logger.log(`Deleting club with id ${_id}`);
    const club = await this.clubModel.findByIdAndDelete(_id).lean().exec();
    if (!club) {
      this.logger.debug(`Club with id ${_id} not found, cannot delete`);
      throw new HttpException('Club not found', 404);
    }
    return club;
  }


  async findPlayersByClub(clubId: string): Promise<IFindPlayer[] | null> {
    this.logger.log(`Finding players for club with id ${clubId}`);
    const club = await this.clubModel.findById(clubId).exec();
    if (!club) {
      throw new HttpException('Club not found', 404);
    }
    return this.playerModel.find({ _id: { $in: club.players } }).lean().exec();
  }

  async canUserDeleteClub(userId: string, role: string, clubId: string): Promise<boolean> {
    const club = await this.findOne(clubId);
    if (!club) return false;
  
    if (role === 'Admin') return true;
    if (role === 'Clubbeheerder') return true;
  
    return false;
  }

  async findMatchesByClub(clubId: string): Promise<Match[]> {
    return this.matchModel.find({
      $or: [{ home_club_id: clubId }, { away_club_id: clubId }],
    }).lean().exec();
  }

  // Haal meerdere clubs op via een lijst van IDs (gebruikt door Neo4j integratie)
  async findManyByIds(ids: string[]): Promise<IFindClub[]> {
    if (!ids.length) return [];
    return this.clubModel
      .find({ _id: { $in: ids } })
      .lean()
      .exec();
  }
}