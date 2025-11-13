import { IsOptional, IsUUID, IsString, MaxLength } from 'class-validator';

export class UpdateZentraUserProjectDto {
  @IsUUID()
  @IsOptional()
  userId?: string;

  @IsUUID()
  @IsOptional()
  projectId?: string;

}