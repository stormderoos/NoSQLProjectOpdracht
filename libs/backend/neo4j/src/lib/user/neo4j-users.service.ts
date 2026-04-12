import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class Neo4jUsersService {

  constructor(private readonly neo4jService: Neo4jService) {}

  // Aanroepen vanuit AuthService bij registratie
  async createUserNode(userId: string, username: string): Promise<void> {
    await this.neo4jService.write(
      `MERGE (u:User {id: $userId}) SET u.username = $username`,
      { userId, username }
    );
  }

  // Volg een andere gebruiker (unidirectioneel)
  async followUser(followerId: string, followeeId: string): Promise<void> {
    if (followerId === followeeId) {
      throw new BadRequestException('You cannot follow yourself');
    }
    
    await this.neo4jService.write(
      `MERGE (a:User {id: $followerId})
      MERGE (b:User {id: $followeeId})
      MERGE (a)-[:FOLLOWS]->(b)`,
      { followerId, followeeId }
    );
  }

  // Unfollow
  async unfollowUser(followerId: string, followeeId: string): Promise<void> {
    await this.neo4jService.write(
      `MATCH (a:User {id: $followerId})-[r:FOLLOWS]->(b:User {id: $followeeId})
       DELETE r`,
      { followerId, followeeId }
    );
  }

  // Haal alle users op die ik volg
  async getFollowing(userId: string): Promise<string[]> {
    const result = await this.neo4jService.read(
      `MATCH (a:User {id: $userId})-[:FOLLOWS]->(b:User)
       RETURN b.id AS id`,
      { userId }
    );
    return result.records.map(r => r.get('id'));
  }

  // Clubs van spelers die gevolgd worden door mensen die ik volg (B5 eis)
  async getClubsFollowedByFollowing(userId: string): Promise<string[]> {
    const result = await this.neo4jService.read(
      `MATCH (me:User {id: $userId})-[:FOLLOWS]->(other:User)-[:FOLLOWS_CLUB]->(c:Club)
       RETURN DISTINCT c.id AS id`,
      { userId }
    );
    return result.records.map(r => r.get('id'));
  }

  async followClub(userId: string, clubId: string): Promise<void> {
  await this.neo4jService.write(
    `MATCH (u:User {id: $userId})
     MERGE (c:Club {id: $clubId})
     MERGE (u)-[:FOLLOWS_CLUB]->(c)`,
    { userId, clubId }
  );
}

// Clubs gevolgd door mensen die ik volg (dit is B5)
async getClubsFromFollowing(userId: string): Promise<string[]> {
  const result = await this.neo4jService.read(
    `MATCH (me:User {id: $userId})-[:FOLLOWS]->(other:User)-[:FOLLOWS_CLUB]->(c:Club)
     RETURN DISTINCT c.id AS clubId`,
    { userId }
  );
  return result.records.map(r => r.get('clubId'));
}
}