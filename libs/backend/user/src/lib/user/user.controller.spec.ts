// bcrypt uses native bindings that may not match the test runner architecture
jest.mock('bcrypt', () => ({
  genSalt: jest.fn().mockResolvedValue('salt'),
  hash: jest.fn().mockResolvedValue('hashed'),
  compare: jest.fn().mockResolvedValue(true),
}));

import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserExistGuard } from './user-exists.guard';
import { IUser } from '@avans-nx-workshop/shared/api';

const USER_ID = 'user123';
const selfReq = { user: { user_id: USER_ID, role: 'user' } };
const adminReq = { user: { user_id: 'admin-id', role: 'admin' } };
const strangerReq = { user: { user_id: 'stranger-id', role: 'user' } };

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const exampleUser: Partial<IUser> = {
    id: USER_ID,
    username: 'testuser',
    email: 'test@test.com',
    role: 'user' as any,
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
            deleteUser: jest.fn(),
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

      const result = await controller.findOne(USER_ID);

      expect(service.findOne).toHaveBeenCalledWith(USER_ID);
      expect(result).toHaveProperty('id', USER_ID);
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
      expect(result).toHaveProperty('id', USER_ID);
    });
  });

  describe('update', () => {
    it('should allow a user to update their own profile', async () => {
      const dto = { username: 'updateduser' };
      const updated = { ...exampleUser, ...dto };
      jest.spyOn(service, 'updateUser').mockResolvedValue(updated as IUser);

      const result = await controller.update(USER_ID, dto as any, selfReq as any);

      expect(service.updateUser).toHaveBeenCalledWith(USER_ID, dto);
      expect(result).toHaveProperty('username', 'updateduser');
    });

    it('should allow an admin to update any profile', async () => {
      const dto = { username: 'adminchange' };
      jest.spyOn(service, 'updateUser').mockResolvedValue({ ...exampleUser, ...dto } as IUser);

      const result = await controller.update(USER_ID, dto as any, adminReq as any);

      expect(result).toHaveProperty('username', 'adminchange');
    });

    it('should throw ForbiddenException when updating another user\'s profile', async () => {
      await expect(
        controller.update(USER_ID, { username: 'hack' } as any, strangerReq as any)
      ).rejects.toThrow(ForbiddenException);

      expect(service.updateUser).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should allow a user to delete their own account', async () => {
      jest.spyOn(service, 'deleteUser').mockResolvedValue(undefined);

      await controller.remove(USER_ID, selfReq as any);

      expect(service.deleteUser).toHaveBeenCalledWith(USER_ID);
    });

    it('should allow an admin to delete any account', async () => {
      jest.spyOn(service, 'deleteUser').mockResolvedValue(undefined);

      await controller.remove(USER_ID, adminReq as any);

      expect(service.deleteUser).toHaveBeenCalledWith(USER_ID);
    });

    it('should throw ForbiddenException when deleting another user\'s account', async () => {
      await expect(
        controller.remove(USER_ID, strangerReq as any)
      ).rejects.toThrow(ForbiddenException);

      expect(service.deleteUser).not.toHaveBeenCalled();
    });
  });
});
