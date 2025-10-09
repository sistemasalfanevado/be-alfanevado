import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateZentraBankAccountHierarchyDto {
  @IsString()
  @IsOptional()
  @MaxLength(100, { message: 'El nombre no debe exceder los 100 caracteres' })
  name?: string;
}