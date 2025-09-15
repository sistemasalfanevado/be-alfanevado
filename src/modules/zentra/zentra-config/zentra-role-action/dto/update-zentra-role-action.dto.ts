import { IsUUID, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateZentraRoleActionDto {
  @IsUUID()
  @IsOptional()
  roleId?: string;

  @IsUUID()
  @IsOptional()
  actionId?: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  idFirebase?: string;
}