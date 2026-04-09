import { forwardRef, Module } from '@nestjs/common';
import { Neo4jUsersController } from './user/neo4j-users.controller';
import { Neo4JStatsController } from './stats/neo4j-stats.controller';
import { Neo4JStatsService } from './stats/neo4j-stats.service';
import { Neo4jUsersService } from './user/neo4j-users.service';
import { Neo4jModule } from 'nest-neo4j';

@Module({
  imports: [Neo4jModule],
  controllers: [Neo4JStatsController, Neo4jUsersController],
  providers: [Neo4JStatsService, Neo4jUsersService],
  exports: [Neo4jModule, Neo4jUsersService],
})
export class Neo4jBackendModule {}