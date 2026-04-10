import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { Neo4jUsersService } from '@avans-nx-workshop/backend/neo4j';

// Mock the Mongoose User model
const mockUserModel = {
  findOne: jest.fn(),
  create: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn(() => 'mock.jwt.token'),
};

const mockNeo4jUsersService = {
  createUserNode: jest.fn().mockResolvedValue(undefined),
};

describe('AuthService', () => {
  let service: AuthService;

  const hashedPassword = bcrypt.hashSync('Test1234!', 10);

  const existingUser = {
    _id: 'user123',
    id: 'user123',
    username: 'testuser',
    email: 'test@example.com',
    password: hashedPassword,
    role: 'User',
    profileImgUrl: 'https://cdn-icons-png.flaticon.com/512/219/219969.png',
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getModelToken('User'), useValue: mockUserModel },
        { provide: JwtService, useValue: mockJwtService },
        { provide: Neo4jUsersService, useValue: mockNeo4jUsersService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('register', () => {
    it('should create a new user and return an identity with a token', async () => {
      mockUserModel.findOne.mockResolvedValue(null); // no existing user
      mockUserModel.create.mockResolvedValue({
        ...existingUser,
        toObject: () => existingUser,
      });

      const result = await service.register({
        username: 'testuser',
        email: 'test@example.com',
        password: 'Test1234!',
      } as any);

      expect(result).toHaveProperty('token', 'mock.jwt.token');
      expect(result).toHaveProperty('email', 'test@example.com');
      expect(mockUserModel.findOne).toHaveBeenCalledTimes(1);
      expect(mockUserModel.create).toHaveBeenCalledTimes(1);
    });

    it('should throw ConflictException when email already exists', async () => {
      mockUserModel.findOne.mockResolvedValue(existingUser);

      await expect(
        service.register({
          username: 'testuser',
          email: 'test@example.com',
          password: 'Test1234!',
        } as any),
      ).rejects.toThrow(ConflictException);

      expect(mockUserModel.create).not.toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('should return an identity with a token when credentials are correct', async () => {
      // findOne with .select('+password').exec() chain
      mockUserModel.findOne.mockReturnValue({
        select: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(existingUser),
        }),
      });

      const result = await service.login({
        email: 'test@example.com',
        password: 'Test1234!',
      });

      expect(result).toHaveProperty('token', 'mock.jwt.token');
      expect(result).toHaveProperty('email', 'test@example.com');
    });

    it('should throw UnauthorizedException when password is wrong', async () => {
      mockUserModel.findOne.mockReturnValue({
        select: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(existingUser),
        }),
      });

      await expect(
        service.login({ email: 'test@example.com', password: 'WrongPassword!' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException when user does not exist', async () => {
      mockUserModel.findOne.mockReturnValue({
        select: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(null),
        }),
      });

      await expect(
        service.login({ email: 'nobody@example.com', password: 'Test1234!' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
