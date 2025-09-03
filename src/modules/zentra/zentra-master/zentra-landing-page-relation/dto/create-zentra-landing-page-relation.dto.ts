import { IsString, IsNotEmpty} from 'class-validator';

export class CreateZentraLandingPageRelationDto {
  @IsString()
  @IsNotEmpty({ message: 'El ID del proyecto Zentra es obligatorio' })
  zentraProjectId: string;

  @IsString()
  @IsNotEmpty({ message: 'El ID del proyecto Landing es obligatorio' })
  landingPageId: string;
}