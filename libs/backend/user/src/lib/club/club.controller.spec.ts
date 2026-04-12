import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { ClubController } from './club.controller';
import { ClubService } from './club.service';
import { ClubExistGuard } from './club-exists.guard';
import { IFindClub } from '@avans-nx-workshop/shared/api';

const OWNER_ID = 'user-owner-id';
const OTHER_ID = 'user-other-id';
const ownerReq = { user: { user_id: OWNER_ID, role: 'user' } };
const adminReq = { user: { user_id: OTHER_ID, role: 'admin' } };
const strangerReq = { user: { user_id: OTHER_ID, role: 'user' } };

describe('ClubController', () => {
  let controller: ClubController;
  let service: ClubService;

  const exampleClub: Partial<IFindClub> = {
    name: 'FC Breda',
    location: 'Breda',
    logoUrl: 'https://example.com/logo.png',
    players: [],
    createdBy: OWNER_ID,
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClubController],
      providers: [
        {
          provide: ClubService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findPlayersByClub: jest.fn(),
            findMatchesByClub: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(ClubExistGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<ClubController>(ClubController);
    service = module.get<ClubService>(ClubService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should call service.findAll and return the result', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([exampleClub as IFindClub]);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalledTimes(1);
      expect(result).toHaveLength(1);
      expect(result[0]).toHaveProperty('name', 'FC Breda');
    });

    it('should return an empty array when no clubs exist', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([]);

      const result = await controller.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should call service.findOne with the correct id', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(exampleClub as IFindClub);

      const result = await controller.findOne('club123');

      expect(service.findOne).toHaveBeenCalledWith('club123');
      expect(result).toHaveProperty('name', 'FC Breda');
    });

    it('should propagate NotFoundException from service', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException());

      await expect(controller.findOne('nonexistent')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should set createdBy from JWT and call service.create', async () => {
      const dto: any = { name: 'FC Breda', location: 'Breda' };
      jest.spyOn(service, 'create').mockResolvedValue(exampleClub as IFindClub);

      const result = await controller.create(dto, ownerReq as any);

      expect(dto.createdBy).toBe(OWNER_ID);
      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toHaveProperty('name', 'FC Breda');
    });
  });

  describe('update', () => {
    it('should allow the owner to update their club', async () => {
      const dto = { name: 'FC Rotterdam', location: 'Rotterdam' };
      const updated = { ...exampleClub, ...dto };
      jest.spyOn(service, 'findOne').mockResolvedValue(exampleClub as IFindClub);
      jest.spyOn(service, 'update').mockResolvedValue(updated as IFindClub);

      const result = await controller.update('club123', dto as any, ownerReq as any);

      expect(service.update).toHaveBeenCalledWith('club123', dto);
      expect(result).toHaveProperty('name', 'FC Rotterdam');
    });

    it('should allow an admin to update any club', async () => {
      const dto = { name: 'FC Admin' };
      jest.spyOn(service, 'findOne').mockResolvedValue(exampleClub as IFindClub);
      jest.spyOn(service, 'update').mockResolvedValue({ ...exampleClub, ...dto } as IFindClub);

      const result = await controller.update('club123', dto as any, adminReq as any);

      expect(result).toHaveProperty('name', 'FC Admin');
    });

    it('should throw ForbiddenException when a non-owner tries to update', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(exampleClub as IFindClub);

      await expect(
        controller.update('club123', { name: 'Hack' } as any, strangerReq as any)
      ).rejects.toThrow(ForbiddenException);

      expect(service.update).not.toHaveBeenCalled();
    });
  });

  describe('deleteClub', () => {
    it('should allow the owner to delete their club', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(exampleClub as IFindClub);
      jest.spyOn(service, 'delete').mockResolvedValue(exampleClub as IFindClub);

      await controller.deleteClub('club123', ownerReq as any);

      expect(service.delete).toHaveBeenCalledWith('club123');
    });

    it('should allow an admin to delete any club', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(exampleClub as IFindClub);
      jest.spyOn(service, 'delete').mockResolvedValue(exampleClub as IFindClub);

      await controller.deleteClub('club123', adminReq as any);

      expect(service.delete).toHaveBeenCalledWith('club123');
    });

    it('should throw ForbiddenException when a non-owner tries to delete', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(exampleClub as IFindClub);

      await expect(
        controller.deleteClub('club123', strangerReq as any)
      ).rejects.toThrow(ForbiddenException);

      expect(service.delete).not.toHaveBeenCalled();
    });
  });
});
