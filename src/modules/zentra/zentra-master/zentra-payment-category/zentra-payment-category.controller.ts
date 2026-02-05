import { Controller, Get, Post, Body, Param, Patch, Put, Delete, UseGuards } from '@nestjs/common';
import { ZentraPaymentCategoryService } from './zentra-payment-category.service';
import { CreateZentraPaymentCategoryDto } from './dto/create-zentra-payment-category.dto';
import { UpdateZentraPaymentCategoryDto } from './dto/update-zentra-payment-category.dto';

@Controller('zentra-payment-category')
export class ZentraPaymentCategoryController {
  constructor(private readonly zentraPaymentCategoryService: ZentraPaymentCategoryService) {}

  @Post()
  create(@Body() createZentraPaymentCategoryDto: CreateZentraPaymentCategoryDto) {
    return this.zentraPaymentCategoryService.create(createZentraPaymentCategoryDto);
  }

  @Get()
  findAll() {
    return this.zentraPaymentCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraPaymentCategoryService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateZentraPaymentCategoryDto: UpdateZentraPaymentCategoryDto) {
    return this.zentraPaymentCategoryService.update(id, updateZentraPaymentCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraPaymentCategoryService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraPaymentCategoryService.restore(id);
  }
}