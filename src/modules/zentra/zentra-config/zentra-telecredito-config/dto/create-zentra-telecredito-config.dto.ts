import {
  IsString,
  IsNotEmpty,
  IsUUID,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class CreateZentraTelecreditoConfigDto {
  @IsUUID()
  @IsNotEmpty()
  companyId: string;
  
  @IsUUID()
  @IsNotEmpty()
  bankAccountId: string;
  

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  clientCode: string; // Código de cliente asignado por el BCP

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  payrollType: string; // Tipo de planilla (ej: PROV)

  @IsString()
  @IsOptional()
  @MaxLength(1)
  recordType?: string = 'C'; // Siempre será "C" para el registro de cargo

  @IsString()
  @IsNotEmpty()
  @MaxLength(1)
  accountType: string; // "C" = corriente, "A" = ahorro

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  accountNumber: string; // Número de cuenta del BCP

  @IsString()
  @IsOptional()
  @MaxLength(100)
  reference?: string; // Referencia opcional de la planilla

  @IsString()
  @IsOptional()
  @MaxLength(1)
  checkItf?: string;

  @IsString()
  @IsOptional()
  @MaxLength(1)
  checkParty?: string;
}