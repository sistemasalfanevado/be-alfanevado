import { IsString, IsOptional, IsUUID } from 'class-validator';

export class UpdateZentraLandingProjectRelationDto {
  @IsString()
  @IsOptional()
  zentraProjectId?: string;

  @IsString()
  @IsOptional()
  landingProjectId?: string;

}