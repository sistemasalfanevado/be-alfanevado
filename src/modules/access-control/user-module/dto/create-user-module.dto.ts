import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserModuleDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  moduleId: string;
}