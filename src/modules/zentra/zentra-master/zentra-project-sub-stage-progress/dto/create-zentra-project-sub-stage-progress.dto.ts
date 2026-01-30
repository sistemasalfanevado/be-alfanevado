import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsOptional,
  IsNumber,
  IsUUID,
  IsDateString,
} from 'class-validator';

export class CreateZentraProjectSubStageProgressDto {
  @IsUUID()
  @IsNotEmpty({ message: 'La relación con la sub-etapa del proyecto es obligatoria' })
  projectSubStageId: string;

  @IsUUID()
  @IsNotEmpty({ message: 'Debes seleccionar un porcentaje de la lista' })
  percentageId: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  responsible: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  description: string;

  @IsDateString()
  @IsOptional()
  finishDate?: string;

  @IsNumber()
  @IsOptional()
  investmentAmount?: number;
}