import { Controller, Post, Delete, Get, Param, Request } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { Neo4jUsersService } from './neo4j-users.service';
import { ClubService } from '@avans-nx-workshop/backend/user';

@Controller('neo4j/users')
export class Neo4jUsersController {
  constructor(
    private readonly neo4jUsersService: Neo4jUsersService,
    private readonly clubService: ClubService,
  ) {}

  @Post(':id/follow')
  async follow(
    @Request() req: ExpressRequest & { user: { user_id: string } },
    @Param('id') followeeId: string,
  ) {
    await this.neo4jUsersService.followUser(req.user.user_id, followeeId);
    return { message: 'Followed' };
  }

  @Delete(':id/follow')
  async unfollow(
    @Request() req: ExpressRequest & { user: { user_id: string } },
    @Param('id') followeeId: string,
  ) {
    await this.neo4jUsersService.unfollowUser(req.user.user_id, followeeId);
    return { message: 'Unfollowed' };
  }

  @Get('following')
  async getFollowing(
    @Request() req: ExpressRequest & { user: { user_id: string } },
  ) {
    return this.neo4jUsersService.getFollowing(req.user.user_id);
  }

  @Post('clubs/:clubId/follow')
  async followClub(
    @Request() req: ExpressRequest & { user: { user_id: string } },
    @Param('clubId') clubId: string,
  ) {
    await this.neo4jUsersService.followClub(req.user.user_id, clubId);
    return { message: 'Club followed' };
  }

  // B5: Geeft clubs terug die gevolgd worden door gebruikers die ik volg.
  // Combineert Neo4j (relaties) met MongoDB (volledige clubdata).
  @Get('clubs/following')
  async getClubsFromFollowing(
    @Request() req: ExpressRequest & { user: { user_id: string } },
  ) {
    const clubIds = await this.neo4jUsersService.getClubsFromFollowing(
      req.user.user_id,
    );
    return this.clubService.findManyByIds(clubIds);
  }
}
