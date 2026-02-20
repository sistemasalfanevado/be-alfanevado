import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { ZentraExtrasService } from './zentra-extras.service';
import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-extras')
export class ZentraExtrasController {
  constructor(private readonly zentraExtrasService: ZentraExtrasService) { }

  @Post('recover-rates')
  @Public()
  async recoverRates(
    @Body('startDate') startDate: string,
    @Body('endDate') endDate: string,
    @Body('isDryRun') isDryRun: boolean
  ) {
    
    const report = await this.zentraExtrasService.recoverHistoricalRates(
      startDate,
      endDate,
      isDryRun ?? true
    );

    return {
      message: isDryRun
        ? "Simulación completada con éxito. Revisa el reporte."
        : "Proceso de actualización real finalizado.",
      totalDaysProcessed: report.length,
      //report
    };
  }


}