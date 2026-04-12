jest.mock('bcrypt', () => ({
  genSalt: jest.fn().mockResolvedValue('salt'),
  hash: jest.fn().mockResolvedValue('hashed'),
  compare: jest.fn().mockResolvedValue(true),
}));

import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { User } from './user.schema';

const mockExec = jest.fn();
const mockLean = jest.fn(() => ({ exec: mockExec }));
const mockSelect = jest.fn(() => ({ lean: mockLean }));

const mockUserModel = {
  find: jest.fn(() => ({ lean: mockLean })),
  findOne: jest.fn(() => ({ lean: mockLean, select: mockSelect })),
  findById: jest.fn(() => ({ lean: mockLean, exec: mockExec })),
  create: jest.fn(),
} as any;

describe('UserService', () => {
  let service: UserService;

  const exampleUser = {
    _id: 'user123',
    id: 'user123',
    username: 'testuser',
    email: 'test@test.com',
    role: 'User',
    profileImgUrl: 'https://example.com/avatar.png',
    gender: 'Unknown',
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getModelToken(User.name), useValue: mockUserModel },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  describe('findAll', () => {
    it('should return all users mapped correctly', async () => {
      mockExec.mockResolvedValueOnce([exampleUser]);

      const result = await service.findAll();

      expect(result).toHaveLength(1);
      expect(result[0]).toHaveProperty('id', 'user123');
      expect(result[0]).toHaveProperty('username', 'testuser');
    });

    it('should return an empty array when no users exist', async () => {
      mockExec.mockResolvedValueOnce([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a user when found', async () => {
      mockExec.mockResolvedValueOnce(exampleUser);

      const result = await service.findOne('user123');

      expect(result).toHaveProperty('username', 'testuser');
      expect(mockUserModel.findOne).toHaveBeenCalledWith({ _id: 'user123' });
    });

    it('should return null when user does not exist', async () => {
      mockExec.mockResolvedValueOnce(null);

      const result = await service.findOne('nonexistent');

      expect(result).toBeNull();
    });
  });

  describe('findOneByEmail', () => {
    it('should return a user when found by email', async () => {
      mockExec.mockResolvedValueOnce(exampleUser);

      const result = await service.findOneByEmail('test@test.com');

      expect(result).toHaveProperty('email', 'test@test.com');
    });

    it('should return null when email is not found', async () => {
      mockExec.mockResolvedValueOnce(null);

      const result = await service.findOneByEmail('nobody@test.com');

      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should create and return a new user', async () => {
      const savedUser = { ...exampleUser, toObject: () => exampleUser };
      mockUserModel.create.mockResolvedValueOnce(savedUser);

      const dto = { username: 'testuser', email: 'test@test.com', password: 'secret' };
      const result = await service.create(dto as any);

      expect(mockUserModel.create).toHaveBeenCalledWith(dto);
      expect(result).toHaveProperty('username', 'testuser');
    });
  });
});
