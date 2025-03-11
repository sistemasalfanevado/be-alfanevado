import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateLotStatusDto {
  @IsString()
  @IsOptional()
  @MaxLength(25)
  title?: string;
}