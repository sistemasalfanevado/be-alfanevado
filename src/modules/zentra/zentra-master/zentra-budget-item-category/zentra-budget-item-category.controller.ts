import { Controller, Get, Post, Body, Param, Patch, Put, Delete, UseGuards } from '@nestjs/common';
import { ZentraBudgetItemCategoryService } from './zentra-budget-item-category.service';
import { CreateZentraBudgetItemCategoryDto } from './dto/create-zentra-budget-item-category.dto';
import { UpdateZentraBudgetItemCategoryDto } from './dto/update-zentra-budget-item-category.dto';

import { JwtAuthGuard } from '../../../../auth/shared/guards/jwt-auth.guard';
import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-budget-item-categories')
//@UseGuards(JwtAuthGuard)
export class ZentraBudgetItemCategoryController {
  constructor(private readonly zentraBudgetItemCategoryService: ZentraBudgetItemCategoryService) {}

  @Post()
  create(@Body() createZentraBudgetItemCategoryDto: CreateZentraBudgetItemCategoryDto) {
    return this.zentraBudgetItemCategoryService.create(createZentraBudgetItemCategoryDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.zentraBudgetItemCategoryService.findAll();
  }

  @Get('complete')
  @Public()
  findSimple() {
    return this.zentraBudgetItemCategoryService.findAllComplete();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraBudgetItemCategoryService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateZentraBudgetItemCategoryDto: UpdateZentraBudgetItemCategoryDto) {
    return this.zentraBudgetItemCategoryService.update(id, updateZentraBudgetItemCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraBudgetItemCategoryService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraBudgetItemCategoryService.restore(id);
  }
}