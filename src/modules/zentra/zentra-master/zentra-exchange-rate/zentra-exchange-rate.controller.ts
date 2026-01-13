import { Controller, Get, Post, Body, Param, Patch, Put, Delete } from '@nestjs/common';
import { ZentraExchangeRateService } from './zentra-exchange-rate.service';
import { CreateZentraExchangeRateDto } from './dto/create-zentra-exchange-rate.dto';
import { UpdateZentraExchangeRateDto } from './dto/update-zentra-exchange-rate.dto';

@Controller('exchange-rates')
export class ZentraExchangeRateController {
  constructor(private readonly exchangeRateService: ZentraExchangeRateService) {}

  @Post()
  create(@Body() createDto: CreateZentraExchangeRateDto) {
    return this.exchangeRateService.create(createDto);
  }

  @Get()
  findAll() {
    return this.exchangeRateService.findAll();
  }

  @Get('today')
  findToday() {
    return this.exchangeRateService.getTodayRate();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exchangeRateService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateZentraExchangeRateDto) {
    return this.exchangeRateService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exchangeRateService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.exchangeRateService.restore(id);
  }
}