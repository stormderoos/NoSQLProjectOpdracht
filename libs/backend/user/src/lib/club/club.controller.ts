import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ClubService } from './club.service';
import { IClub, IFindClub, IFindPlayer, IFindMatch } from '@avans-nx-workshop/shared/api';
import { CreateClubDto, UpdateClubDto } from '@avans-nx-workshop/backend/dto';
import { ClubExistGuard } from './club-exists.guard';


@Controller('clubs')
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  @Get()
  async findAll(): Promise<IFindClub[]> {
    return this.clubService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IFindClub | null> {
    return this.clubService.findOne(id);
  }

  @Post('')
  @UseGuards(ClubExistGuard)
  create(@Body() club: CreateClubDto): Promise<IFindClub> {
    return this.clubService.create(club);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() club: UpdateClubDto,
  ): Promise<IFindClub | null> {
    return this.clubService.update(id, club);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteClub(@Param('id') id: string) {
    await this.clubService.delete(id);
  }

  @Get(':id/players')
  async findPlayers(@Param('id') id: string): Promise<IFindPlayer[] | null> {
    return this.clubService.findPlayersByClub(id);
  }

  @Get(':id/matches')
  getClubMatches(@Param('id') id: string): Promise<IFindMatch[]> {
    return this.clubService.findMatchesByClub(id);
  }

}