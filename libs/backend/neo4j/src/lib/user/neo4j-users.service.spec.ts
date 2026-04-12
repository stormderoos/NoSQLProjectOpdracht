import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j';
import { Neo4jUsersService } from './neo4j-users.service';

const mockNeo4jService = {
  write: jest.fn(),
  read: jest.fn(),
};

describe('Neo4jUsersService', () => {
  let service: Neo4jUsersService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Neo4jUsersService,
        { provide: Neo4jService, useValue: mockNeo4jService },
      ],
    }).compile();

    service = module.get<Neo4jUsersService>(Neo4jUsersService);
  });

  describe('followUser', () => {
    it('should call neo4jService.write with MERGE query', async () => {
      mockNeo4jService.write.mockResolvedValue(undefined);

      await service.followUser('userA', 'userB');

      expect(mockNeo4jService.write).toHaveBeenCalledTimes(1);
      const [query, params] = mockNeo4jService.write.mock.calls[0];
      expect(query).toContain('FOLLOWS');
      expect(params).toEqual({ followerId: 'userA', followeeId: 'userB' });
    });

    it('should throw BadRequestException when following yourself', async () => {
      await expect(service.followUser('userA', 'userA')).rejects.toThrow(
        BadRequestException,
      );
      expect(mockNeo4jService.write).not.toHaveBeenCalled();
    });
  });

  describe('unfollowUser', () => {
    it('should call neo4jService.write with DELETE query', async () => {
      mockNeo4jService.write.mockResolvedValue(undefined);

      await service.unfollowUser('userA', 'userB');

      expect(mockNeo4jService.write).toHaveBeenCalledTimes(1);
      const [query, params] = mockNeo4jService.write.mock.calls[0];
      expect(query).toContain('DELETE');
      expect(params).toEqual({ followerId: 'userA', followeeId: 'userB' });
    });
  });

  describe('getFollowing', () => {
    it('should return an array of user ids that the user follows', async () => {
      mockNeo4jService.read.mockResolvedValue({
        records: [
          { get: jest.fn(() => 'userB') },
          { get: jest.fn(() => 'userC') },
        ],
      });

      const result = await service.getFollowing('userA');

      expect(result).toEqual(['userB', 'userC']);
      expect(mockNeo4jService.read).toHaveBeenCalledTimes(1);
    });

    it('should return an empty array when user follows nobody', async () => {
      mockNeo4jService.read.mockResolvedValue({ records: [] });

      const result = await service.getFollowing('userA');

      expect(result).toEqual([]);
    });
  });

  describe('createUserNode', () => {
    it('should call neo4jService.write with MERGE query for a user node', async () => {
      mockNeo4jService.write.mockResolvedValue(undefined);

      await service.createUserNode('user123', 'testuser');

      expect(mockNeo4jService.write).toHaveBeenCalledTimes(1);
      const [query, params] = mockNeo4jService.write.mock.calls[0];
      expect(query).toContain('MERGE');
      expect(params).toEqual({ userId: 'user123', username: 'testuser' });
    });
  });
});
