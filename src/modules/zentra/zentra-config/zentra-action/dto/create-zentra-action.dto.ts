import { IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class CreateZentraActionDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  idFirebase?: string;
}