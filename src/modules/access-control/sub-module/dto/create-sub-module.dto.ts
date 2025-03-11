import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateSubModuleDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  description: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  route: string;
}