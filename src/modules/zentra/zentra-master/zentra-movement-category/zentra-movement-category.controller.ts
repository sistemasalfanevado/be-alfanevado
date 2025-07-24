import { Controller, Get, Post, Body, Param, Patch, Put, Delete, UseGuards } from '@nestjs/common';
import { ZentraMovementCategoryService } from './zentra-movement-category.service';
import { CreateZentraMovementCategoryDto } from './dto/create-zentra-movement-category.dto';
import { UpdateZentraMovementCategoryDto } from './dto/update-zentra-movement-category.dto';

import { JwtAuthGuard } from '../../../../auth/shared/guards/jwt-auth.guard';
import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-movement-categories')
//@UseGuards(JwtAuthGuard)
export class ZentraMovementCategoryController {
  constructor(private readonly zentraMovementCategoryService: ZentraMovementCategoryService) {}

  @Post()
  create(@Body() createZentraMovementCategoryDto: CreateZentraMovementCategoryDto) {
    return this.zentraMovementCategoryService.create(createZentraMovementCategoryDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.zentraMovementCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraMovementCategoryService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateZentraMovementCategoryDto: UpdateZentraMovementCategoryDto) {
    return this.zentraMovementCategoryService.update(id, updateZentraMovementCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraMovementCategoryService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraMovementCategoryService.restore(id);
  }
}