import { Module } from '@nestjs/common';
import { Neo4jModule } from './neo4j-module'; 
import { Neo4JStatsController } from './neo4j.controller';
import { Neo4JPlayerService } from './neo4j-stats.service';

@Module({
  imports: [Neo4jModule], 
  controllers: [Neo4JStatsController],
  providers: [Neo4JPlayerService],
})
export class Neo4jBackendModule {}