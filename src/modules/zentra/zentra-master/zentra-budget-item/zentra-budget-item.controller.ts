import { Controller, Get, Post, Body, Param, Patch, Put, Delete, UseGuards } from '@nestjs/common';
import { ZentraBudgetItemService } from './zentra-budget-item.service';
import { CreateZentraBudgetItemDto } from './dto/create-zentra-budget-item.dto';
import { UpdateZentraBudgetItemDto } from './dto/update-zentra-budget-item.dto';

@Controller('zentra-budget-items')
export class ZentraBudgetItemController {
  constructor(private readonly zentraBudgetItemService: ZentraBudgetItemService) { }

  @Post()
  create(@Body() createZentraBudgetItemDto: CreateZentraBudgetItemDto) {
    return this.zentraBudgetItemService.create(createZentraBudgetItemDto);
  }

  @Get()
  findAll() {
    return this.zentraBudgetItemService.findAll();
  }

  @Get('complete')
  findSimple() {
    return this.zentraBudgetItemService.findAllComplete();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraBudgetItemService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateZentraBudgetItemDto: UpdateZentraBudgetItemDto) {
    return this.zentraBudgetItemService.update(id, updateZentraBudgetItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraBudgetItemService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraBudgetItemService.restore(id);
  }

  @Get('complete-project/:projectId')
  findAllCompleteByProject(@Param('projectId') projectId: string) {
    return this.zentraBudgetItemService.findAllCompleteByProject(projectId);
  }

  @Get('project/:projectId')
  findAllByProject(@Param('projectId') projectId: string) {
    return this.zentraBudgetItemService.findAllByProject(projectId);
  }

  @Get('company/:companyId')
  findAllByCompany(@Param('companyId') companyId: string) {
    return this.zentraBudgetItemService.findAllByCompany(companyId);
  }  

  
  @Post('category')
  findAllByCategory(@Body() body: { categoryId: string; projectId: string }) {
    return this.zentraBudgetItemService.findAllByCategory(body.categoryId, body.projectId);
  }
  
  @Post('search')
  search(@Body() filters: {
    natureId?: string;
    projectId?: string;
  }) {
    return this.zentraBudgetItemService.findByFilters(filters);
  }

  @Post('search-extra')
  searchExtra(@Body() filters: {
    projectId?: string;
  }) {
    return this.zentraBudgetItemService.findByFiltersExtra(filters);
  }
  

}