import { Controller, Get, Post, Body, Param, Patch, Put, Delete } from '@nestjs/common';
import { ZentraDocumentCategoryService } from './zentra-document-category.service';
import { CreateZentraDocumentCategoryDto } from './dto/create-zentra-document-category.dto';
import { UpdateZentraDocumentCategoryDto } from './dto/update-zentra-document-category.dto';

@Controller('zentra-document-categories')
export class ZentraDocumentCategoryController {
  constructor(
    private readonly zentraDocumentCategoryService: ZentraDocumentCategoryService,
  ) {}

  @Post()
  create(@Body() createDto: CreateZentraDocumentCategoryDto) {
    return this.zentraDocumentCategoryService.create(createDto);
  }

  @Get()
  findAll() {
    return this.zentraDocumentCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraDocumentCategoryService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateZentraDocumentCategoryDto,
  ) {
    return this.zentraDocumentCategoryService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraDocumentCategoryService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraDocumentCategoryService.restore(id);
  }
}