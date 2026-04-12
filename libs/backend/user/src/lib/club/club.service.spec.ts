import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { HttpException, NotFoundException } from '@nestjs/common';
import { ClubService } from './club.service';
import { Club } from './club.schema';
import { Player } from '../player/player.schema';
import { Match } from '../match/match.schema';

// Helpers voor Mongoose chain: model.find().lean().exec()
const mockExec = jest.fn();
const mockLean = jest.fn(() => ({ exec: mockExec }));

const mockClubInstance = {
  save: jest.fn(),
  toObject: jest.fn(),
};

const mockClubModel = jest.fn(() => mockClubInstance) as any;
mockClubModel.find = jest.fn(() => ({ lean: mockLean }));
mockClubModel.findOne = jest.fn(() => ({ lean: mockLean }));
mockClubModel.findById = jest.fn(() => ({ lean: mockLean, exec: mockExec }));
mockClubModel.findByIdAndUpdate = jest.fn(() => ({ lean: mockLean }));
mockClubModel.findByIdAndDelete = jest.fn(() => ({ lean: mockLean }));

const mockAggregateExec = jest.fn();

const mockPlayerModel = {
  find: jest.fn(() => ({ lean: mockLean })),
  aggregate: jest.fn(() => ({ exec: mockAggregateExec })),
} as any;

const mockMatchModel = {
  find: jest.fn(() => ({ lean: mockLean })),
} as any;

describe('ClubService', () => {
  let service: ClubService;

  const exampleClub = {
    _id: 'club123',
    name: 'FC Breda',
    location: 'Breda',
    logoUrl: 'https://example.com/logo.png',
    players: [],
    createdBy: 'user1',
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClubService,
        { provide: getModelToken(Club.name), useValue: mockClubModel },
        { provide: getModelToken(Player.name), useValue: mockPlayerModel },
        { provide: getModelToken(Match.name), useValue: mockMatchModel },
      ],
    }).compile();

    service = module.get<ClubService>(ClubService);
  });

  describe('findAll', () => {
    it('should return all clubs', async () => {
      mockExec.mockResolvedValueOnce([exampleClub]);

      const result = await service.findAll();

      expect(result).toHaveLength(1);
      expect(result[0]).toHaveProperty('name', 'FC Breda');
      expect(mockClubModel.find).toHaveBeenCalledTimes(1);
    });

    it('should return an empty array when no clubs exist', async () => {
      mockExec.mockResolvedValueOnce([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a club when found', async () => {
      mockExec.mockResolvedValueOnce(exampleClub);

      const result = await service.findOne('club123');

      expect(result).toHaveProperty('name', 'FC Breda');
      expect(mockClubModel.findOne).toHaveBeenCalledWith({ _id: 'club123' });
    });

    it('should throw NotFoundException when club does not exist', async () => {
      mockExec.mockResolvedValueOnce(null);

      await expect(service.findOne('nonexistent')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create and return a new club', async () => {
      mockExec.mockResolvedValueOnce([]);
      mockClubInstance.save.mockResolvedValueOnce(mockClubInstance);
      mockClubInstance.toObject.mockReturnValueOnce(exampleClub);

      const dto = { name: 'FC Breda', location: 'Breda' };
      const result = await service.create(dto as any);

      expect(mockClubInstance.save).toHaveBeenCalledTimes(1);
      expect(result).toHaveProperty('name', 'FC Breda');
    });

    it('should throw 400 when a player already belongs to another club', async () => {
      mockExec.mockResolvedValueOnce([
        { firstName: 'Jan', lastName: 'Jansen', clubId: 'other-club' },
      ]);

      const dto = { name: 'FC Breda', location: 'Breda', players: ['player1'] };

      await expect(service.create(dto as any)).rejects.toThrow(HttpException);
    });
  });

  describe('update', () => {
    it('should update and return the updated club', async () => {
      const updated = { ...exampleClub, location: 'Rotterdam' };
      mockExec.mockResolvedValueOnce([]);
      mockExec.mockResolvedValueOnce(updated);

      const result = await service.update('club123', { location: 'Rotterdam' } as any);

      expect(result).toHaveProperty('location', 'Rotterdam');
      expect(mockClubModel.findByIdAndUpdate).toHaveBeenCalledWith(
        'club123',
        { location: 'Rotterdam' },
        { new: true },
      );
    });
  });

  describe('delete', () => {
    it('should delete and return the deleted club', async () => {
      mockExec.mockResolvedValueOnce(exampleClub);

      const result = await service.delete('club123');

      expect(result).toHaveProperty('name', 'FC Breda');
      expect(mockClubModel.findByIdAndDelete).toHaveBeenCalledWith('club123');
    });

    it('should throw 404 when deleting a non-existing club', async () => {
      mockExec.mockResolvedValueOnce(null);

      await expect(service.delete('nonexistent')).rejects.toThrow(HttpException);
    });
  });

  describe('getClubStats', () => {
    it('should return aggregated stats for a club', async () => {
      mockAggregateExec.mockResolvedValueOnce([
        {
          _id: 'club123',
          totalPlayers: 3,
          totalGoals: 45,
          totalAssists: 12,
          avgGoals: 15,
          topScorer: { firstName: 'Erling', lastName: 'Haaland', goals: 30 },
        },
      ]);

      const result = await service.getClubStats('club123');

      expect(result.clubId).toBe('club123');
      expect(result.totalPlayers).toBe(3);
      expect(result.totalGoals).toBe(45);
      expect(result.totalAssists).toBe(12);
      expect(result.avgGoals).toBe(15);
      expect(result.topScorer).toEqual({ firstName: 'Erling', lastName: 'Haaland', goals: 30 });
    });

    it('should round avgGoals to 1 decimal place', async () => {
      mockAggregateExec.mockResolvedValueOnce([
        {
          _id: 'club123',
          totalPlayers: 3,
          totalGoals: 10,
          totalAssists: 4,
          avgGoals: 3.3333,
          topScorer: null,
        },
      ]);

      const result = await service.getClubStats('club123');

      expect(result.avgGoals).toBe(3.3);
    });

    it('should return zeroed stats when club has no players', async () => {
      mockAggregateExec.mockResolvedValueOnce([]);

      const result = await service.getClubStats('club123');

      expect(result).toEqual({
        clubId: 'club123',
        totalPlayers: 0,
        totalGoals: 0,
        totalAssists: 0,
        avgGoals: 0,
        topScorer: null,
      });
    });

    it('should call aggregate with $match on clubId', async () => {
      mockAggregateExec.mockResolvedValueOnce([]);

      await service.getClubStats('club999');

      expect(mockPlayerModel.aggregate).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ $match: { clubId: 'club999' } }),
        ]),
      );
    });
  });
});
