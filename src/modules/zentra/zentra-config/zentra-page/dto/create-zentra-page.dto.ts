import { IsString, IsNotEmpty, MaxLength, IsUUID } from 'class-validator';

export class CreateZentraPageDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  description: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  route: string;

  @IsUUID()
  @IsNotEmpty()
  pageGroupId: string;
}