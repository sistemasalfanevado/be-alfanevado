import { Controller, Get, Post, Body, Param, Put, Delete, Patch, UseGuards } from '@nestjs/common';
import { ZentraProjectIncomeService } from './zentra-project-income.service';
import { CreateZentraProjectIncomeDto } from './dto/create-zentra-project-income.dto';
import { UpdateZentraProjectIncomeDto } from './dto/update-zentra-project-income.dto';

import { JwtAuthGuard } from '../../../../auth/shared/guards/jwt-auth.guard';
import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-project-income')
//@UseGuards(JwtAuthGuard)
export class ZentraProjectIncomeController {
  constructor(private readonly zentraProjectIncomeService: ZentraProjectIncomeService) {}

  @Post()
  create(@Body() createDto: CreateZentraProjectIncomeDto) {
    return this.zentraProjectIncomeService.create(createDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.zentraProjectIncomeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraProjectIncomeService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateZentraProjectIncomeDto) {
    return this.zentraProjectIncomeService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraProjectIncomeService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraProjectIncomeService.restore(id);
  }
}