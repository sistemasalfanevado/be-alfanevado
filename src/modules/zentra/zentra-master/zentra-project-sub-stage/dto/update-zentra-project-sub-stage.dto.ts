import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateZentraProjectSubStageDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty({ message: 'El ID del proyecto es obligatorio' })
  projectId: string;

  @IsString()
  @IsUUID()
  @IsNotEmpty({ message: 'El ID de la sub-etapa es obligatorio' })
  subStageId: string;
}