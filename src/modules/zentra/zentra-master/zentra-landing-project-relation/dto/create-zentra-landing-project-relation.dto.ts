import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateZentraLandingProjectRelationDto {
  @IsString()
  @IsNotEmpty({ message: 'El ID del proyecto Zentra es obligatorio' })
  zentraProjectId: string;

  @IsString()
  @IsNotEmpty({ message: 'El ID del proyecto Landing es obligatorio' })
  landingProjectId: string;
}