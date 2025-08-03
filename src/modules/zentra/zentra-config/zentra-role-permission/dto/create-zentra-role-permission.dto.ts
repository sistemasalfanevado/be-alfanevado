import { IsUUID, IsNotEmpty, IsString, IsOptional, MaxLength } from 'class-validator';

export class CreateZentraRolePermissionDto {
  @IsUUID()
  @IsNotEmpty()
  roleId: string;

  @IsUUID()
  @IsNotEmpty()
  pageId: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  idFirebase?: string;
}