import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player } from './player.schema';
import { Observable } from 'rxjs';

@Injectable()
export class PlayerExistGuard implements CanActivate {
  constructor(@InjectModel(Player.name) private readonly playerModel: Model<Player>) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const player = context.switchToHttp().getRequest().body;

    return this.playerModel
      .findOne({ firstName: player.firstName, lastName: player.lastName, birthdate: player.birthdate })
      .then((existingPlayer) => {
        if (existingPlayer) {
          console.warn(`Player with name ${player.firstName} ${player.lastName} already exists.`);
        }
        return !existingPlayer;
      });
  }
}