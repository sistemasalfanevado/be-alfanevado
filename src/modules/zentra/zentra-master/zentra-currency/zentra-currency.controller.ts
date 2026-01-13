import { Controller, Get, Post, Body, Param, Patch, Put, Delete, UseGuards } from '@nestjs/common';
import { ZentraCurrencyService } from './zentra-currency.service';
import { CreateZentraCurrencyDto } from './dto/create-zentra-currency.dto';
import { UpdateZentraCurrencyDto } from './dto/update-zentra-currency.dto';

@Controller('zentra-currencies')
export class ZentraCurrencyController {
  constructor(private readonly zentraCurrencyService: ZentraCurrencyService) {}

  @Post()
  create(@Body() createZentraCurrencyDto: CreateZentraCurrencyDto) {
    return this.zentraCurrencyService.create(createZentraCurrencyDto);
  }

  @Get()
  findAll() {
    return this.zentraCurrencyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraCurrencyService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateZentraCurrencyDto: UpdateZentraCurrencyDto) {
    return this.zentraCurrencyService.update(id, updateZentraCurrencyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraCurrencyService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraCurrencyService.restore(id);
  }
}