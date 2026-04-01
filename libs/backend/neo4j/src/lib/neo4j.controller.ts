import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Neo4JPlayerService } from './neo4j-stats.service';

@Controller('neo4j/stats')
export class Neo4JStatsController {
  constructor(private readonly neo4jStatsService: Neo4JPlayerService) {}

  @Get('player/:playerId')
  async getPlayerStats(@Param('playerId') playerId: string): Promise<{ goals: number; assists: number }> {
    return await this.neo4jStatsService.getPlayerStats(playerId);
  }

  @Post('')
  async syncMatchStats(
    @Body()
    match: {
      id: string;
      scorers: { playerId: string; goals: number }[];
      assisters: { playerId: string; assists: number }[];
    }
  ): Promise<void> {
    await this.neo4jStatsService.syncMatchStats(match);
  }
}