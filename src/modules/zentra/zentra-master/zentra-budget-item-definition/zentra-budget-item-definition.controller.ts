import { Controller, Get, Post, Body, Param, Patch, Put, Delete, UseGuards } from '@nestjs/common';
import { ZentraBudgetItemDefinitionService } from './zentra-budget-item-definition.service';
import { CreateZentraBudgetItemDefinitionDto } from './dto/create-zentra-budget-item-definition.dto';
import { UpdateZentraBudgetItemDefinitionDto } from './dto/update-zentra-budget-item-definition.dto';

import { JwtAuthGuard } from '../../../../auth/shared/guards/jwt-auth.guard';
import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-budget-item-definitions')
//@UseGuards(JwtAuthGuard)
export class ZentraBudgetItemDefinitionController {
  constructor(private readonly zentraBudgetItemDefinitionService: ZentraBudgetItemDefinitionService) {}

  @Post()
  create(@Body() createZentraBudgetItemDefinitionDto: CreateZentraBudgetItemDefinitionDto) {
    return this.zentraBudgetItemDefinitionService.create(createZentraBudgetItemDefinitionDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.zentraBudgetItemDefinitionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraBudgetItemDefinitionService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string, 
    @Body() updateZentraBudgetItemDefinitionDto: UpdateZentraBudgetItemDefinitionDto
  ) {
    return this.zentraBudgetItemDefinitionService.update(id, updateZentraBudgetItemDefinitionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraBudgetItemDefinitionService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraBudgetItemDefinitionService.restore(id);
  }
}