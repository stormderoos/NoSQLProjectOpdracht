import { Body, Controller, Get, Param, Post, Put, Delete, Patch, Query } from '@nestjs/common';
import { PlayerService } from './player.service';
import { CreatePlayerDto, UpdatePlayerDto } from '@avans-nx-workshop/backend/dto';
import { Player } from './player.schema';

@Controller('players')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  // D3: GET /players?position=ST,RW&minGoals=5&maxGoals=20&sortBy=goals&order=desc
  // Als er query-params zijn → search(), anders → findAll()
  @Get()
  async findAll(
    @Query('position') position?: string,
    @Query('clubId') clubId?: string,
    @Query('minGoals') minGoals?: string,
    @Query('maxGoals') maxGoals?: string,
    @Query('sortBy') sortBy?: 'goals' | 'assists',
    @Query('order') order?: 'asc' | 'desc',
  ): Promise<Player[]> {
    const hasFilters = position || clubId || minGoals || maxGoals || sortBy;
    if (hasFilters) {
      return this.playerService.search({
        position,
        clubId,
        minGoals: minGoals !== undefined ? Number(minGoals) : undefined,
        maxGoals: maxGoals !== undefined ? Number(maxGoals) : undefined,
        sortBy,
        order,
      });
    }
    return this.playerService.findAll();
  }

  // D2: GET /players/top-scorers?limit=10 — aggregate pipeline
  // Let op: moet VOOR :id staan, anders wordt 'top-scorers' als id gezien
  @Get('top-scorers')
  async getTopScorers(@Query('limit') limit?: string): Promise<any[]> {
    return this.playerService.getTopScorers(limit ? Number(limit) : 10);
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