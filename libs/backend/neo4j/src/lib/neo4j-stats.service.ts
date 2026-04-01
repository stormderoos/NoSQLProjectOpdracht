import { Injectable, Logger } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j';

@Injectable()
export class Neo4JPlayerService {
  private readonly logger = new Logger(Neo4JPlayerService.name);

  constructor(private readonly neo4jService: Neo4jService) {}

  async getPlayers(): Promise<any[]> {
    this.logger.log('Fetching all players from Neo4j');
    const query = `
      MATCH (p:Player)
      RETURN p
    `;
    const result = await this.neo4jService.read(query);
    return result.records.map(record => record.get('p').properties);
  }
  
  async getPlayerStats(playerId: string): Promise<{ goals: number; assists: number }> {
    this.logger.log(`Fetching stats for player with id ${playerId}`);
    const query = `
      MATCH (p:Player {id: $playerId})
      OPTIONAL MATCH (m1:Match)-[:SCORED_BY]->(p)
      OPTIONAL MATCH (m2:Match)-[:ASSISTED_BY]->(p)
      RETURN count(m1) AS goals, count(m2) AS assists
    `;
    const result = await this.neo4jService.read(query, { playerId });
    const record = result.records[0];
    return {
      goals: record.get('goals').toNumber(),
      assists: record.get('assists').toNumber(),
    };
  }

  async addMatchWithStats(matchId: string, scoredBy: string[], assistedBy: string[]): Promise<void> {
    const query = `
      MERGE (m:Match {id: $matchId})
      WITH m
      UNWIND $scoredBy AS scorerId
        MATCH (p1:Player {id: scorerId})
        MERGE (m)-[:SCORED_BY]->(p1)
      WITH m
      UNWIND $assistedBy AS assisterId
        MATCH (p2:Player {id: assisterId})
        MERGE (m)-[:ASSISTED_BY]->(p2)
    `;
  
    await this.neo4jService.write(query, {
      matchId,
      scoredBy,
      assistedBy,
    });
  }

  async syncMatchStats(match: {
    id: string;
    scorers: { playerId: string; goals: number }[];
    assisters: { playerId: string; assists: number }[];
  }): Promise<void> {
    const scoredBy = match.scorers.flatMap(s => Array(s.goals).fill(s.playerId));
    const assistedBy = match.assisters.flatMap(a => Array(a.assists).fill(a.playerId));
  
    this.logger.log(`Syncing match ${match.id} with ${scoredBy.length} goals and ${assistedBy.length} assists`);
  
    await this.neo4jService.write(`
      MERGE (m:Match {id: $matchId})
      WITH m
      OPTIONAL MATCH (m)-[r1:SCORED_BY]->()
      DELETE r1
      WITH m
      OPTIONAL MATCH (m)-[r2:ASSISTED_BY]->()
      DELETE r2
    `, { matchId: match.id });
  
    await this.neo4jService.write(`
      MATCH (m:Match {id: $matchId})
      UNWIND $scoredBy AS scorerId
        MATCH (p1:Player {id: scorerId})
        CREATE (m)-[:SCORED_BY]->(p1)
      WITH m
      UNWIND $assistedBy AS assisterId
        MATCH (p2:Player {id: assisterId})
        CREATE (m)-[:ASSISTED_BY]->(p2)
    `, {
      matchId: match.id,
      scoredBy,
      assistedBy,
    });
  }
}