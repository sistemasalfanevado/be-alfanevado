import { IsString, IsNotEmpty, MaxLength, IsUUID, IsNumber, IsOptional } from 'class-validator';

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
  area: number;

  @IsNumber()
  @IsNotEmpty()
  perimeter: number; 

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  detail: string;

  @IsUUID()
  @IsNotEmpty()
  statusId: string;

  @IsUUID()
  @IsNotEmpty()
  pageId: string;

  @IsNumber()
  @IsOptional()
  pricePerSquareMeter?: number;

  @IsNumber()
  @IsOptional()
  totalPrice?: number;

}