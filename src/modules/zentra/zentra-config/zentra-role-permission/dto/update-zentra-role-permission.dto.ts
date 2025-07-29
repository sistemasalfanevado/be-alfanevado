import { IsNotEmpty } from 'class-validator';

export class UpdateZentraRolePermissionDto {
  @IsNotEmpty()
  roleId?: string;

  @IsNotEmpty()
  pageId?: string;

}