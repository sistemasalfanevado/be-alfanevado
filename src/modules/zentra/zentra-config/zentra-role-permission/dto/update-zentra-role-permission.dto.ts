import { IsNotEmpty, IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateZentraRolePermissionDto {
  @IsNotEmpty()
  roleId?: string;

  @IsNotEmpty()
  pageId?: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  idFirebase?: string;
}