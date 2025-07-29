import { IsUUID, IsNotEmpty } from 'class-validator';

export class CreateZentraRolePermissionDto {
  @IsUUID()
  @IsNotEmpty()
  roleId: string;

  @IsUUID()
  @IsNotEmpty()
  pageId: string;

}