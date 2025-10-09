import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateZentraBankAccountTypeDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @MaxLength(100, { message: 'Name must not exceed 100 characters' })
  name: string;
}