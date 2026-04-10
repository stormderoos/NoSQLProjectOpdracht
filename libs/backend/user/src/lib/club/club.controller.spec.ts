import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ClubController } from './club.controller';
import { ClubService } from './club.service';
import { ClubExistGuard } from './club-exists.guard';
import { IFindClub } from '@avans-nx-workshop/shared/api';

describe('ClubController', () => {
  let controller: ClubController;
  let service: ClubService;

  const exampleClub: Partial<IFindClub> = {
    name: 'FC Breda',
    location: 'Breda',
    logoUrl: 'https://example.com/logo.png',
    players: [],
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
      // Override the guard so we don't need to provide ClubModel
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
    it('should call service.create with the club dto', async () => {
      const dto = { name: 'FC Breda', location: 'Breda' };
      jest.spyOn(service, 'create').mockResolvedValue(exampleClub as IFindClub);

      const result = await controller.create(dto as any);

      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toHaveProperty('name', 'FC Breda');
    });
  });

  describe('update', () => {
    it('should call service.update with id and dto', async () => {
      const dto = { name: 'FC Rotterdam', location: 'Rotterdam' };
      const updated = { ...exampleClub, ...dto };
      jest.spyOn(service, 'update').mockResolvedValue(updated as IFindClub);

      const result = await controller.update('club123', dto as any);

      expect(service.update).toHaveBeenCalledWith('club123', dto);
      expect(result).toHaveProperty('name', 'FC Rotterdam');
    });
  });

  describe('deleteClub', () => {
    it('should call service.delete with the correct id', async () => {
      jest.spyOn(service, 'delete').mockResolvedValue(exampleClub as IFindClub);

      await controller.deleteClub('club123');

      expect(service.delete).toHaveBeenCalledWith('club123');
    });
  });
});
