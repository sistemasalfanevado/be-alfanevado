import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateZentraRolePermissionDto {
  @IsBoolean()
  @IsOptional()
  canCreate?: boolean;

  @IsBoolean()
  @IsOptional()
  canEdit?: boolean;

  @IsBoolean()
  @IsOptional()
  canDelete?: boolean;
}