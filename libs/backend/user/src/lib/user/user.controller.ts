import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Put,
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
    update(
        @Param('id') id: string,
        @Body() user: UpdateUserDto
    ): Promise<IUserInfo | null> {
        return this.userService.updateUser(id, user);
    }
}
