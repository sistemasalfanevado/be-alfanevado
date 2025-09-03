import { IsString, IsNotEmpty, Length, IsOptional, MaxLength } from 'class-validator';

export class CreateZentraBrokerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  idFirebase?: string;

}