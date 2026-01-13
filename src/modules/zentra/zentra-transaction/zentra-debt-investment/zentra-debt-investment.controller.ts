import {
  Controller, Get, Post, Body, Param, Patch, Put, Delete, UseGuards
} from '@nestjs/common';
import { ZentraDebtInvestmentService } from './zentra-debt-investment.service';

@Controller('zentra-debt-investments')
export class ZentraDebtInvestmentController {
  constructor(
    private readonly zentraDebtInvestmentService: ZentraDebtInvestmentService,
  ) { }
  
  @Post('movement')
  createMovement(@Body() createDataDto: any) {
    return this.zentraDebtInvestmentService.addMovement(createDataDto);
  }
  
  @Delete('movement/:id')
  removeMovement(@Param('id') id: string) {
    return this.zentraDebtInvestmentService.removeMovement(id);
  }

  @Put('movement/:id')
  updateMovement(@Param('id') id: string, @Body() updateDataDto: any) {
    return this.zentraDebtInvestmentService.updateMovement(id, updateDataDto);
  }
  

}