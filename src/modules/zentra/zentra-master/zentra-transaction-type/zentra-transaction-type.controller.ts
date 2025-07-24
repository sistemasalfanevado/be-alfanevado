import { Controller, Get, Post, Body, Param, Patch, Put, Delete, UseGuards } from '@nestjs/common';
import { ZentraTransactionTypeService } from './zentra-transaction-type.service';
import { CreateZentraTransactionTypeDto } from './dto/create-zentra-transaction-type.dto';
import { UpdateZentraTransactionTypeDto } from './dto/update-zentra-transaction-type.dto';

import { JwtAuthGuard } from '../../../../auth/shared/guards/jwt-auth.guard';
import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-transaction-types')
//@UseGuards(JwtAuthGuard)
export class ZentraTransactionTypeController {
  constructor(private readonly zentraTransactionTypeService: ZentraTransactionTypeService) {}

  @Post()
  create(@Body() createZentraTransactionTypeDto: CreateZentraTransactionTypeDto) {
    return this.zentraTransactionTypeService.create(createZentraTransactionTypeDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.zentraTransactionTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraTransactionTypeService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateZentraTransactionTypeDto: UpdateZentraTransactionTypeDto) {
    return this.zentraTransactionTypeService.update(id, updateZentraTransactionTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraTransactionTypeService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraTransactionTypeService.restore(id);
  }
}