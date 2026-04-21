import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import { PlayerService } from './player.service';
import { Player } from './player.schema';

const mockExec = jest.fn();
const mockLean = jest.fn(() => ({ exec: mockExec }));
const mockSort = jest.fn(() => ({ lean: mockLean }));
const mockAggregateExec = jest.fn();

const mockPlayerInstance = {
  save: jest.fn(),
};

const mockPlayerModel = jest.fn(() => mockPlayerInstance) as any;
mockPlayerModel.find = jest.fn(() => ({ sort: mockSort, lean: mockLean }));
mockPlayerModel.findById = jest.fn(() => ({ lean: mockLean }));
mockPlayerModel.findByIdAndUpdate = jest.fn(() => ({ lean: mockLean }));
mockPlayerModel.findByIdAndDelete = jest.fn(() => ({ exec: mockExec }));
mockPlayerModel.aggregate = jest.fn(() => ({ exec: mockAggregateExec }));

const examplePlayer = {
  _id: 'player1',
  firstName: 'Erling',
  lastName: 'Haaland',
  position: 'ST',
  clubId: 'club1',
  birthdate: new Date('2000-07-21'),
  goals: 30,
  assists: 5,
  profileImageUrl: '/assets/footballplayer.png',
};

describe('PlayerService', () => {
  let service: PlayerService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayerService,
        { provide: getModelToken(Player.name), useValue: mockPlayerModel },
      ],
    }).compile();

    service = module.get<PlayerService>(PlayerService);
  });

  describe('findAll', () => {
    it('should return all players', async () => {
      mockExec.mockResolvedValueOnce([examplePlayer]);

      const result = await service.findAll();

      expect(result).toHaveLength(1);
      expect(result[0]).toHaveProperty('firstName', 'Erling');
      expect(mockPlayerModel.find).toHaveBeenCalledWith();
    });

    it('should return empty array when no players', async () => {
      mockExec.mockResolvedValueOnce([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a player when found', async () => {
      mockExec.mockResolvedValueOnce(examplePlayer);

      const result = await service.findOne('player1');

      expect(result).toHaveProperty('lastName', 'Haaland');
      expect(mockPlayerModel.findById).toHaveBeenCalledWith('player1');
    });

    it('should return null when player does not exist', async () => {
      mockExec.mockResolvedValueOnce(null);

      const result = await service.findOne('nonexistent');

      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should create and return a new player', async () => {
      mockPlayerInstance.save.mockResolvedValueOnce(examplePlayer);

      const dto = {
        firstName: 'Erling',
        lastName: 'Haaland',
        position: 'ST',
        birthdate: new Date('2000-07-21'),
      };

      const result = await service.create(dto as any);

      expect(mockPlayerInstance.save).toHaveBeenCalledTimes(1);
      expect(result).toHaveProperty('firstName', 'Erling');
    });
  });

  describe('update', () => {
    it('should update and return the updated player', async () => {
      const updated = { ...examplePlayer, goals: 35 };
      mockExec.mockResolvedValueOnce(updated);

      const result = await service.update('player1', { goals: 35 } as any);

      expect(result).toHaveProperty('goals', 35);
      expect(mockPlayerModel.findByIdAndUpdate).toHaveBeenCalledWith(
        'player1',
        { goals: 35 },
        { new: true },
      );
    });
  });

  describe('remove', () => {
    it('should delete a player without returning a value', async () => {
      mockExec.mockResolvedValueOnce(null);

      await expect(service.remove('player1')).resolves.toBeUndefined();
      expect(mockPlayerModel.findByIdAndDelete).toHaveBeenCalledWith('player1');
    });
  });

  describe('findByClub', () => {
    it('should return players belonging to the given club', async () => {
      mockExec.mockResolvedValueOnce([examplePlayer]);

      const result = await service.findByClub('club1');

      expect(result).toHaveLength(1);
      expect(mockPlayerModel.find).toHaveBeenCalledWith({ clubId: 'club1' });
    });
  });

  describe('getPlayerStats', () => {
    it('should return goals and assists for a player', async () => {
      mockExec.mockResolvedValueOnce(examplePlayer);

      const result = await service.getPlayerStats('player1');

      expect(result).toEqual({ goals: 30, assists: 5 });
    });

    it('should throw NotFoundException when player does not exist', async () => {
      mockExec.mockResolvedValueOnce(null);

      await expect(service.getPlayerStats('nonexistent')).rejects.toThrow(NotFoundException);
    });
  });

  describe('getTopScorers', () => {
    it('should return top 10 scorers via aggregate pipeline', async () => {
      const topScorers = [
        { ...examplePlayer, goals: 30 },
        { _id: 'player2', firstName: 'Kylian', lastName: 'Mbappe', position: 'LW', goals: 25, assists: 12 },
      ];
      mockAggregateExec.mockResolvedValueOnce(topScorers);

      const result = await service.getTopScorers(10);

      expect(result).toHaveLength(2);
      expect(result[0]).toHaveProperty('goals', 30);
      expect(mockPlayerModel.aggregate).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ $match: { goals: { $gt: 0 } } }),
          expect.objectContaining({ $sort: { goals: -1, assists: -1 } }),
          expect.objectContaining({ $limit: 10 }),
        ]),
      );
    });

    it('should use provided limit in aggregate pipeline', async () => {
      mockAggregateExec.mockResolvedValueOnce([examplePlayer]);

      await service.getTopScorers(5);

      expect(mockPlayerModel.aggregate).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ $limit: 5 }),
        ]),
      );
    });

    it('should return empty array when no players have goals', async () => {
      mockAggregateExec.mockResolvedValueOnce([]);

      const result = await service.getTopScorers();

      expect(result).toEqual([]);
    });
  });

  describe('search', () => {
    it('should filter by single position', async () => {
      mockExec.mockResolvedValueOnce([examplePlayer]);

      const result = await service.search({ position: 'ST' });

      expect(result).toHaveLength(1);
      expect(mockPlayerModel.find).toHaveBeenCalledWith(
        expect.objectContaining({ position: 'ST' }),
      );
    });

    it('should use $in operator for multiple positions', async () => {
      const rwPlayer = { ...examplePlayer, position: 'RW' };
      mockExec.mockResolvedValueOnce([examplePlayer, rwPlayer]);

      const result = await service.search({ position: 'ST,RW' });

      expect(result).toHaveLength(2);
      expect(mockPlayerModel.find).toHaveBeenCalledWith(
        expect.objectContaining({ position: { $in: ['ST', 'RW'] } }),
      );
    });

    it('should use $gte for minGoals filter', async () => {
      mockExec.mockResolvedValueOnce([examplePlayer]);

      await service.search({ minGoals: 10 });

      expect(mockPlayerModel.find).toHaveBeenCalledWith(
        expect.objectContaining({ goals: { $gte: 10 } }),
      );
    });

    it('should use $lte for maxGoals filter', async () => {
      mockExec.mockResolvedValueOnce([examplePlayer]);

      await service.search({ maxGoals: 50 });

      expect(mockPlayerModel.find).toHaveBeenCalledWith(
        expect.objectContaining({ goals: { $lte: 50 } }),
      );
    });

    it('should combine $gte and $lte for goals range', async () => {
      mockExec.mockResolvedValueOnce([examplePlayer]);

      await service.search({ minGoals: 5, maxGoals: 40 });

      expect(mockPlayerModel.find).toHaveBeenCalledWith(
        expect.objectContaining({ goals: { $gte: 5, $lte: 40 } }),
      );
    });

    it('should filter by clubId', async () => {
      mockExec.mockResolvedValueOnce([examplePlayer]);

      await service.search({ clubId: 'club1' });

      expect(mockPlayerModel.find).toHaveBeenCalledWith(
        expect.objectContaining({ clubId: 'club1' }),
      );
    });

    it('should apply descending sort on goals', async () => {
      mockExec.mockResolvedValueOnce([examplePlayer]);

      await service.search({ sortBy: 'goals', order: 'desc' });

      expect(mockSort).toHaveBeenCalledWith({ goals: -1 });
    });

    it('should apply ascending sort on assists', async () => {
      mockExec.mockResolvedValueOnce([examplePlayer]);

      await service.search({ sortBy: 'assists', order: 'asc' });

      expect(mockSort).toHaveBeenCalledWith({ assists: 1 });
    });

    it('should return empty array when no players match filters', async () => {
      mockExec.mockResolvedValueOnce([]);

      const result = await service.search({ position: 'GK', minGoals: 100 });

      expect(result).toEqual([]);
    });

    it('should apply no query when called with empty filters', async () => {
      mockExec.mockResolvedValueOnce([examplePlayer]);

      await service.search({});

      expect(mockPlayerModel.find).toHaveBeenCalledWith({});
    });
  });
});
