import { IsString, IsNotEmpty, IsDateString, IsOptional  } from 'class-validator';

export class CreatePlayerDto {
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsString()
  @IsNotEmpty()
  position!: string;

  @IsString()
  @IsOptional()
  clubId?: string;

  @IsDateString()
  @IsNotEmpty()
  birthdate!: string;
}

export class UpdatePlayerDto {
  @IsString()
  firstName?: string;

  @IsString()
  lastName?: string;

  @IsString()
  position?: string;

  @IsString()
  clubId?: string;

  @IsDateString()
  birthdate?: string;
}