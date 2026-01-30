import { IsNumber, IsNotEmpty, Min, Max } from 'class-validator';

export class CreateZentraPercentageDto {
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'El monto debe ser un número con máximo 2 decimales' })
  @Min(0, { message: 'El porcentaje no puede ser menor a 0' })
  @Max(100, { message: 'El porcentaje no puede ser mayor a 100' })
  @IsNotEmpty({ message: 'El monto es obligatorio' })
  amount: number;
}