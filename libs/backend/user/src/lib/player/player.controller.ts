import { Body, Controller, Get, Param, Post, Put, Delete, Patch } from '@nestjs/common';
import { PlayerService } from './player.service';
import { CreatePlayerDto, UpdatePlayerDto } from '@avans-nx-workshop/backend/dto';
import { Player } from './player.schema';

@Controller('players')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get()
  async findAll(): Promise<Player[]> {
    return this.playerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.playerService.findOne(id);
  }

  @Post()
  async create(@Body() createPlayerDto: CreatePlayerDto): Promise<Player> {
    return this.playerService.create(createPlayerDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto): Promise<Player | null> {
    return this.playerService.update(id, updatePlayerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.playerService.remove(id);
  }

  @Get('club/:clubId')
  async findByClub(@Param('clubId') clubId: string): Promise<Player[]> {
    return this.playerService.findByClub(clubId);
  }

  @Get(':id/stats')
  async getPlayerStats(@Param('id') id: string): Promise<{ goals: number; assists: number }> {
    return this.playerService.getPlayerStats(id);
  }

  @Patch(':id')
  async patchClubId(
    @Param('id') id: string,
    @Body() body: { clubId?: string }
  ): Promise<Player | null> {
    return this.playerService.update(id, { clubId: body.clubId });
  }
}