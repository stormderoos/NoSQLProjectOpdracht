import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserExistGuard } from './user-exists.guard';
import { IUser } from '@avans-nx-workshop/shared/api';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const exampleUser: Partial<IUser> = {
    id: 'user123',
    username: 'testuser',
    email: 'test@test.com',
    role: 'User' as any,
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            updateUser: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(UserExistGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should call service.findAll and return all users', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([exampleUser as IUser]);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalledTimes(1);
      expect(result).toHaveLength(1);
      expect(result[0]).toHaveProperty('username', 'testuser');
    });

    it('should return an empty array when no users exist', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([]);

      const result = await controller.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should call service.findOne with the correct id', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(exampleUser as IUser);

      const result = await controller.findOne('user123');

      expect(service.findOne).toHaveBeenCalledWith('user123');
      expect(result).toHaveProperty('id', 'user123');
    });

    it('should return null when user is not found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null);

      const result = await controller.findOne('nonexistent');

      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should call service.create with the user dto', async () => {
      const dto = { username: 'newuser', email: 'new@test.com', password: 'secret' };
      jest.spyOn(service, 'create').mockResolvedValue(exampleUser as IUser);

      const result = await controller.create(dto as any);

      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toHaveProperty('id', 'user123');
    });
  });

  describe('update', () => {
    it('should call service.updateUser with id and dto', async () => {
      const dto = { username: 'updateduser' };
      const updated = { ...exampleUser, ...dto };
      jest.spyOn(service, 'updateUser').mockResolvedValue(updated as IUser);

      const result = await controller.update('user123', dto as any);

      expect(service.updateUser).toHaveBeenCalledWith('user123', dto);
      expect(result).toHaveProperty('username', 'updateduser');
    });
  });
});
