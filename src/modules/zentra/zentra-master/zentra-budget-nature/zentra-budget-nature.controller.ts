import { Controller, Get, Post, Body, Param, Patch, Put, Delete, UseGuards } from '@nestjs/common';
import { ZentraBudgetNatureService } from './zentra-budget-nature.service';
import { CreateZentraBudgetNatureDto } from './dto/create-zentra-budget-nature.dto';
import { UpdateZentraBudgetNatureDto } from './dto/update-zentra-budget-nature.dto';

import { JwtAuthGuard } from '../../../../auth/shared/guards/jwt-auth.guard';
import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-budget-natures')
//@UseGuards(JwtAuthGuard)
export class ZentraBudgetNatureController {
  constructor(private readonly zentraBudgetNatureService: ZentraBudgetNatureService) {}

  @Post()
  create(@Body() createZentraBudgetNatureDto: CreateZentraBudgetNatureDto) {
    return this.zentraBudgetNatureService.create(createZentraBudgetNatureDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.zentraBudgetNatureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraBudgetNatureService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string, 
    @Body() updateZentraBudgetNatureDto: UpdateZentraBudgetNatureDto,
  ) {
    return this.zentraBudgetNatureService.update(id, updateZentraBudgetNatureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraBudgetNatureService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraBudgetNatureService.restore(id);
  }
}