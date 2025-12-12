import { Controller, Get, Post, Body, Param, Patch, Put, Delete, UseGuards } from '@nestjs/common';
import { ZentraTransactionNatureService } from './zentra-transaction-nature.service';
import { CreateZentraTransactionNatureDto } from './dto/create-zentra-transaction-nature.dto';
import { UpdateZentraTransactionNatureDto } from './dto/update-zentra-transaction-nature.dto';

import { JwtAuthGuard } from '../../../../auth/shared/guards/jwt-auth.guard';
import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-transaction-natures')
//@UseGuards(JwtAuthGuard)
export class ZentraTransactionNatureController {
  constructor(private readonly zentraTransactionNatureService: ZentraTransactionNatureService) {}

  @Post()
  create(@Body() createZentraTransactionNatureDto: CreateZentraTransactionNatureDto) {
    return this.zentraTransactionNatureService.create(createZentraTransactionNatureDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.zentraTransactionNatureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraTransactionNatureService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateZentraTransactionNatureDto: UpdateZentraTransactionNatureDto) {
    return this.zentraTransactionNatureService.update(id, updateZentraTransactionNatureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraTransactionNatureService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraTransactionNatureService.restore(id);
  }
}