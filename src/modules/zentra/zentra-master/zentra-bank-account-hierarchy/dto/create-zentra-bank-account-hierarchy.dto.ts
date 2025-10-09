import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateZentraBankAccountHierarchyDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MaxLength(100, { message: 'El nombre no debe exceder los 100 caracteres' })
  name: string;
}