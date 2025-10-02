import { Controller, Get, Post, Body, Param, Patch, Put, Delete, UseGuards } from '@nestjs/common';

import { ZentraTransactionGeneralService } from './zentra-transaction-general.service';

import { JwtAuthGuard } from '../../../../auth/shared/guards/jwt-auth.guard';
import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-transaction-general')
//@UseGuards(JwtAuthGuard)
export class ZentraTransactionGeneralController {
  constructor(private readonly zentraTransactionGeneralService: ZentraTransactionGeneralService) { }

  @Post('weekly-summary')
  async getWeeklySummary(
    @Body() body: { projectId: string; month: number; year: number }
  ) {
    return this.zentraTransactionGeneralService.getWeeklySummary(
      body.projectId,
      body.month,
      body.year
    );
  } 


}