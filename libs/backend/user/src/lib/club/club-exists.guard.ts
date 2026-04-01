import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Club } from './club.schema';
import { Observable } from 'rxjs';

@Injectable()
export class ClubExistGuard implements CanActivate {
  constructor(@InjectModel('Club') private readonly clubModel: Model<Club>) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const club = context.switchToHttp().getRequest().body;

    return this.clubModel
      .findOne({ name: club.name })
      .then((existingClub) => !existingClub);
  }
}