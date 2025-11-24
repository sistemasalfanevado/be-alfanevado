import {
  Controller, Get, Post, Body, Param, Patch, Put, Delete, UseGuards
} from '@nestjs/common';
import { ZentraDocumentExpenseService } from './zentra-document-expense.service';

import { JwtAuthGuard } from '../../../../auth/shared/guards/jwt-auth.guard';
import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-document-expenses') 
//@UseGuards(JwtAuthGuard)
export class ZentraDocumentExpenseController {
  constructor(
    private readonly zentraDocumentExpenseService: ZentraDocumentExpenseService,
  ) { }
  
  @Post('movement')
  createMovement(@Body() createDataDto: any) {
    return this.zentraDocumentExpenseService.addMovement(createDataDto);
  }
  
  @Delete('movement/:id')
  removeMovement(@Param('id') id: string) {
    return this.zentraDocumentExpenseService.removeMovement(id);
  }

  @Put('movement/:id')
  updateMovement(@Param('id') id: string, @Body() updateDataDto: any) {
    return this.zentraDocumentExpenseService.updateMovement(id, updateDataDto);
  }
  

}