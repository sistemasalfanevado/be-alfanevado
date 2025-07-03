import { IsUUID, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateZentraRolePermissionDto {
  @IsUUID()
  @IsNotEmpty()
  roleId: string;

  @IsUUID()
  @IsNotEmpty()
  pageId: string;

  @IsBoolean()
  canCreate: boolean;

  @IsBoolean()
  canEdit: boolean;

  @IsBoolean()
  canDelete: boolean;
}