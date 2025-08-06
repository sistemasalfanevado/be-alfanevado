import { Controller, Get, Post, Body, Param, Patch, Put, Delete } from '@nestjs/common';
import { ZentraBudgetCategoryService } from './zentra-budget-category.service';
import { CreateZentraBudgetCategoryDto } from './dto/create-zentra-budget-category.dto';
import { UpdateZentraBudgetCategoryDto } from './dto/update-zentra-budget-category.dto';
import { Public } from '../../../../auth/shared/decorators/public.decorator';
// import { JwtAuthGuard } from '../../../../auth/shared/guards/jwt-auth.guard';

@Controller('zentra-budget-categories')
// @UseGuards(JwtAuthGuard)
export class ZentraBudgetCategoryController {
  constructor(private readonly zentraBudgetCategoryService: ZentraBudgetCategoryService) {}

  @Post()
  create(@Body() createZentraBudgetCategoryDto: CreateZentraBudgetCategoryDto) {
    return this.zentraBudgetCategoryService.create(createZentraBudgetCategoryDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.zentraBudgetCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraBudgetCategoryService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateZentraBudgetCategoryDto: UpdateZentraBudgetCategoryDto) {
    return this.zentraBudgetCategoryService.update(id, updateZentraBudgetCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraBudgetCategoryService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraBudgetCategoryService.restore(id);
  }
}