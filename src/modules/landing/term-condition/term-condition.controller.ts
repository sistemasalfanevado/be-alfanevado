import { Controller, Get, Post, Body, Param, Delete, UseGuards, Patch } from '@nestjs/common';
import { TermConditionService } from './term-condition.service';
import { CreateTermConditionDto } from './dto/create-term-condition.dto';
import { UpdateTermConditionDto } from './dto/update-term-condition.dto';

import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard'
import { Public } from '../../../auth/decorators/public.decorator'; 

@Controller('term-conditions')
@UseGuards(JwtAuthGuard)
export class TermConditionController {
  constructor(private readonly termConditionService: TermConditionService) {}

  @Post()
  create(@Body() createDto: CreateTermConditionDto) {
    return this.termConditionService.create(createDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.termConditionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.termConditionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateTermConditionDto) {
    return this.termConditionService.update(id, updateDto);
  }

  @Delete(':id')
  softDelete(@Param('id') id: string) {
    return this.termConditionService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.termConditionService.restore(id);
  }
}