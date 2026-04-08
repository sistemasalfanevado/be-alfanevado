import { Controller, Get, Post, Body, Param, Patch, Put, Delete } from '@nestjs/common';
import { ZentraLotQuotationService } from './zentra-lot-quotation.service';
import { CreateZentraLotQuotationDto } from './dto/create-zentra-lot-quotation.dto';
import { UpdateZentraLotQuotationDto } from './dto/update-zentra-lot-quotation.dto';

@Controller('zentra-lot-quotations')
export class ZentraLotQuotationController {
  constructor(
    private readonly lotQuotationService: ZentraLotQuotationService,
  ) {}

  @Post()
  create(@Body() createDto: CreateZentraLotQuotationDto) {
    return this.lotQuotationService.create(createDto);
  }

  @Get()
  findAll() {
    return this.lotQuotationService.findAll();
  }

  @Get('lot/:lotId')
  findByLot(@Param('lotId') lotId: string) {
    return this.lotQuotationService.findByLot(lotId);
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lotQuotationService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string, 
    @Body() updateDto: UpdateZentraLotQuotationDto
  ) {
    return this.lotQuotationService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lotQuotationService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.lotQuotationService.restore(id);
  }
}