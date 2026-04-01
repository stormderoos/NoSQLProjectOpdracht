import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { MatchService } from './match.service';
import { IMatch, IFindMatch } from '@avans-nx-workshop/shared/api';
import { CreateMatchDto, UpdateMatchDto } from '@avans-nx-workshop/backend/dto';

@Controller('matches')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Get()
  async findAll(): Promise<IFindMatch[]> {
    return this.matchService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IFindMatch | null> {
    return this.matchService.findOne(id);
  }

  @Post()
  async create(@Body() match: CreateMatchDto): Promise<IFindMatch> {
    return this.matchService.create(match);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() match: UpdateMatchDto,
  ): Promise<IFindMatch | null> {
    return this.matchService.update(id, match);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.matchService.delete(id);
  }
}