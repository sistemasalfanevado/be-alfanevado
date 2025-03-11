import { IsString, IsNotEmpty } from 'class-validator';

export class CreateModuleSubModuleDto {
  @IsString()
  @IsNotEmpty()
  moduleId: string;

  @IsString()
  @IsNotEmpty()
  subModuleId: string;
}