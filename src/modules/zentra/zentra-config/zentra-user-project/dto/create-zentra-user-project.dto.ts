import { IsUUID, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateZentraUserProjectDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsUUID()
  @IsNotEmpty()
  projectId: string;

}