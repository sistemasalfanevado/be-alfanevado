import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateLotStatusDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  title: string;
}