import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user/user.schema';
import { ClubController } from './club/club.controller';
import { ClubService } from './club/club.service';
import { Club, ClubSchema } from './club/club.schema';
import { Player, PlayerSchema } from './player/player.schema';
import { PlayerController } from './player/player.controller';
import { PlayerService } from './player/player.service';
import { Match, MatchSchema } from './match/match.schema';
import { MatchController } from './match/match.controller';
import { MatchService } from './match/match.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            
            { name: Club.name, schema: ClubSchema },

            { name: Player.name, schema: PlayerSchema },

            { name: Match.name, schema: MatchSchema },

        ])
    ],
    controllers: [UserController, ClubController, PlayerController, MatchController],
    providers: [UserService, ClubService, PlayerService, MatchService],
    exports: [UserService, ClubService, PlayerService, MatchService]
})
export class UsersModule {}
