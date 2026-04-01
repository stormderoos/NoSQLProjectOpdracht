import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Match } from './match.schema';
import { Observable } from 'rxjs';

@Injectable()
export class MatchExistGuard implements CanActivate {
  constructor(@InjectModel('Match') private readonly matchModel: Model<Match>) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const match = context.switchToHttp().getRequest().body;

    return this.matchModel
      .findOne({ date: match.date, home_club_id: match.home_club_id, away_club_id: match.away_club_id })
      .then((existingMatch) => !existingMatch);
  }
}