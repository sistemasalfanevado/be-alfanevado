import { IsUUID, IsNotEmpty, IsString, IsOptional, MaxLength } from 'class-validator';

export class CreateZentraRoleActionDto {
  @IsUUID()
  @IsNotEmpty()
  roleId: string;

  @IsUUID()
  @IsNotEmpty()
  actionId: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  idFirebase?: string;
}