import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateZentraBudgetItemDefinitionDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100, { message: 'El nombre no debe exceder los 100 caracteres' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Debe especificar la categoría' })
  categoryId: string;

  @IsString()
  @IsNotEmpty({ message: 'Debe especificar el proyecto' })
  projectId: string;

  @IsString()
  @IsNotEmpty({ message: 'Debe especificar la naturaleza (Ingreso o Gasto)' })
  natureId: string;

  @IsString()
  @IsOptional()
  visibilityId?: string;

  @IsString()
  @IsOptional()
  @MaxLength(30, { message: 'El idFirebase no debe exceder los 30 caracteres' })
  idFirebase?: string;
}