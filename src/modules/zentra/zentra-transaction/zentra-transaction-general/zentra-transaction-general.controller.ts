import { Controller, Get, Post, Body, Param, Patch, Put, Delete, UseGuards } from '@nestjs/common';

import { ZentraTransactionGeneralService } from './zentra-transaction-general.service';

@Controller('zentra-transaction-general')
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