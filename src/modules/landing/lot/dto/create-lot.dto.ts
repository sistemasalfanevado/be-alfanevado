import { IsString, IsNotEmpty, MaxLength, IsUUID, IsNumber } from 'class-validator';

export class CreateLotDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  number: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  block: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  code: string;

  @IsNumber()
  @IsNotEmpty()
  length: number;

  @IsNumber()
  @IsNotEmpty()
  width: number;

  @IsUUID()
  @IsNotEmpty()
  statusId: string;

  @IsUUID()
  @IsNotEmpty()
  pageId: string;
}