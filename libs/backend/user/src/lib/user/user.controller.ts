import {
    Body,
    Controller,
    Delete,
    ForbiddenException,
    Get,
    NotFoundException,
    Param,
    Post,
    Put,
    Request,
    UseGuards
} from '@nestjs/common';
import { UserService } from './user.service';
import { IUserInfo } from '@avans-nx-workshop/shared/api';
import { CreateUserDto, UpdateUserDto } from '@avans-nx-workshop/backend/dto';
import { UserExistGuard } from './user-exists.guard';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async findAll(): Promise<IUserInfo[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<IUserInfo | null> {
        return this.userService.findOne(id);
    }

    @Post('')
    @UseGuards(UserExistGuard)
    create(@Body() user: CreateUserDto): Promise<IUserInfo> {
        return this.userService.create(user);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() user: UpdateUserDto,
        @Request() req: any,
    ): Promise<IUserInfo | null> {
        if (id !== req.user.user_id.toString() && req.user.role !== 'admin') {
            throw new ForbiddenException('Je mag alleen je eigen profiel aanpassen');
        }
        return this.userService.updateUser(id, user);
    }

    @Delete(':id')
    async remove(
        @Param('id') id: string,
        @Request() req: any,
    ): Promise<void> {
        if (id !== req.user.user_id.toString() && req.user.role !== 'admin') {
            throw new ForbiddenException('Je mag alleen je eigen account verwijderen');
        }
        await this.userService.deleteUser(id);
    }
}
