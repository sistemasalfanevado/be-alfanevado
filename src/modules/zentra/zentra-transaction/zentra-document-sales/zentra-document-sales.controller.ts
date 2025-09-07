import {
  Controller, Get, Post, Body, Param, Patch, Put, Delete, UseGuards
} from '@nestjs/common';
import { ZentraDocumentSalesService } from './zentra-document-sales.service';

import { JwtAuthGuard } from '../../../../auth/shared/guards/jwt-auth.guard';
import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-document-sales')
//@UseGuards(JwtAuthGuard)
export class ZentraDocumentSalesController {
  constructor(
    private readonly zentraDocumentSalesService: ZentraDocumentSalesService,
  ) { }
  
  @Post('movement')
  createMovement(@Body() createDataDto: any) {
    return this.zentraDocumentSalesService.addMovement(createDataDto);
  }
  
  @Delete('movement/:id')
  removeMovement(@Param('id') id: string) {
    return this.zentraDocumentSalesService.removeMovement(id);
  }

  @Put('movement/:id')
  updateMovement(@Param('id') id: string, @Body() updateDataDto: any) {
    return this.zentraDocumentSalesService.updateMovement(id, updateDataDto);
  }
  

}