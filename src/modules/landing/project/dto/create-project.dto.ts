import { IsString, IsNotEmpty, MaxLength, IsUUID, IsOptional, IsNumber } from 'class-validator';

export class CreateProjectDto {
  
  @IsNumber()
  @IsNotEmpty()
  position: number

  @IsString()
  @IsNotEmpty()
  @MaxLength(400)
  linkImage1: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(400)
  linkImage2: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nameImage1: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nameImage2: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(400)
  subtitle: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  textButton: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  linkRedirect1?: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  linkRedirect2?: string;

  @IsUUID()
  @IsNotEmpty()
  pageId: string;
}