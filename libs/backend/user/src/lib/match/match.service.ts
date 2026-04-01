import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Match, MatchDocument } from './match.schema';
import { IMatch, IFindMatch } from '@avans-nx-workshop/shared/api';
import { CreateMatchDto, UpdateMatchDto } from '@avans-nx-workshop/backend/dto';
import { ClubService } from '../club/club.service';
import { PlayerService } from '../player/player.service';

@Injectable()
export class MatchService {
  private readonly logger: Logger = new Logger(MatchService.name);

  constructor(
    @InjectModel(Match.name) private matchModel: Model<MatchDocument>,
    private readonly clubService: ClubService, 
    private readonly playerService: PlayerService, 
  ) {}

  async findAll(): Promise<IFindMatch[]> {
    this.logger.log('Finding all matches');
    return this.matchModel.find().populate('home_club_id away_club_id').lean().exec();
  }

  async findOne(_id: string): Promise<IFindMatch | null> {
    this.logger.log(`Finding match with id ${_id}`);
    return this.matchModel.findById(_id).populate('home_club_id away_club_id').lean().exec();
  }

  async create(match: CreateMatchDto): Promise<Match> {
    this.logger.log(`Creating match between ${match.home_club_id} and ${match.away_club_id}`);
    const createdMatch = new this.matchModel(match);
    const savedMatch = await createdMatch.save();
    return savedMatch.toObject(); 
  }

  async update(_id: string, match: UpdateMatchDto): Promise<Match | null> {
    this.logger.log(`Updating match with id ${_id}`);
    
    const existingMatch = await this.matchModel.findById(_id).lean().exec();
    if (!existingMatch) {
      throw new NotFoundException(`Match with id ${_id} not found`);
    }

    const updatedMatch = await this.matchModel
      .findByIdAndUpdate(_id, match, { new: true })
      .populate('home_club_id away_club_id')
      .lean()
      .exec();

      if (existingMatch.scorers && existingMatch.scorers.length) {
        for (const scorer of existingMatch.scorers) {
          await this.playerService.incrementGoals(scorer.playerId, -(scorer.goals ?? 1));
        }
      }
      if (existingMatch.assisters && existingMatch.assisters.length) {
        for (const assister of existingMatch.assisters) {
          await this.playerService.incrementAssists(assister.playerId, -(assister.assists ?? 1));
        }
      }
      
      if (match.scorers && match.scorers.length) {
        for (const scorer of match.scorers) {
          await this.playerService.incrementGoals(scorer.playerId, scorer.goals ?? 1);
        }
      }
      if (match.assisters && match.assisters.length) {
        for (const assister of match.assisters) {
          await this.playerService.incrementAssists(assister.playerId, assister.assists ?? 1);
        }
      }
    return updatedMatch;
  }

  async delete(_id: string): Promise<void> {
    this.logger.log(`Deleting match with id ${_id}`);
    await this.matchModel.findByIdAndDelete(_id).exec();
  }

  
}