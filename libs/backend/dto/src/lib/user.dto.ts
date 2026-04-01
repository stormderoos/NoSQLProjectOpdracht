import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';
import {
    IUpdateUser,
    IUserRegistration,
    Id,
    UserRole,
    UserGender,
} from '@avans-nx-workshop/shared/api';

export class CreateUserDto implements IUserRegistration {
    @IsString()
    @IsNotEmpty()
    username!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;

    @IsString()
    @IsNotEmpty()
    email!: string;
}

export class UpsertUserDto implements IUpdateUser {
    _id!: Id;

    @IsString()
    @IsNotEmpty()
    username!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;

    @IsString()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsNotEmpty()
    profileImgUrl = '';

    @IsString()
    @IsNotEmpty()
    role: UserRole = UserRole.User;

    @IsString()
    @IsNotEmpty()
    gender: UserGender = UserGender.Unknown;

}

export class UpdateUserDto implements IUpdateUser {
    _id!: Id;

    @IsString()
    @IsNotEmpty()
    username!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;

    @IsString()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsNotEmpty()
    profileImgUrl = '';

    @IsString()
    @IsNotEmpty()
    role: UserRole = UserRole.User;

    @IsString()
    @IsNotEmpty()
    gender: UserGender = UserGender.Unknown;
}
