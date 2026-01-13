import {
  Controller, Get, Post, Body, Param, Patch, Put, Delete, UseGuards
} from '@nestjs/common';
import { ZentraDocumentSalesService } from './zentra-document-sales.service';

@Controller('zentra-document-sales')
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