import { IsString, IsOptional } from 'class-validator';

export class UpdateZentraLandingPageRelationDto {
  @IsString()
  @IsOptional()
  zentraProjectId?: string;

  @IsString()
  @IsOptional()
  landingPageId?: string;

}