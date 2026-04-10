import { IsString, IsOptional, IsArray, IsMongoId } from 'class-validator';

export class CreateClubDto {
  @IsString()
  name!: string;

  @IsString()
  location!: string;

  @IsOptional()
  @IsString()
  logoUrl?: string;

  @IsOptional()
  @IsArray()
  players?: string[]; 

  @IsOptional()
  @IsString()
  createdBy?: string;

}

export class UpdateClubDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  logoUrl?: string;

  @IsOptional()
  @IsArray()
  players?: string[];
}