import { Body, Controller, Delete, ForbiddenException, Get, HttpCode, HttpStatus, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
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
  create(@Body() club: CreateClubDto, @Request() req: any): Promise<IFindClub> {
    club.createdBy = req.user.user_id.toString();
    return this.clubService.create(club);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() club: UpdateClubDto,
    @Request() req: any,
  ): Promise<IFindClub | null> {
    const existing = await this.clubService.findOne(id); // throws NotFoundException when not found
    if (existing!.createdBy !== req.user.user_id.toString() && req.user.role !== 'admin') {
      throw new ForbiddenException('Je mag alleen je eigen clubs aanpassen');
    }
    return this.clubService.update(id, club);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteClub(@Param('id') id: string, @Request() req: any) {
    const existing = await this.clubService.findOne(id); // throws NotFoundException when not found
    if (existing!.createdBy !== req.user.user_id.toString() && req.user.role !== 'admin') {
      throw new ForbiddenException('Je mag alleen je eigen clubs verwijderen');
    }
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

  // D2: GET /clubs/:id/stats — aggregate pipeline over spelers van een club
  @Get(':id/stats')
  getClubStats(@Param('id') id: string) {
    return this.clubService.getClubStats(id);
  }

}