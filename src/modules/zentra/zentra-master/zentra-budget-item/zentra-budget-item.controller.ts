import { Controller, Get, Post, Body, Param, Patch, Put, Delete, UseGuards } from '@nestjs/common';
import { ZentraBudgetItemService } from './zentra-budget-item.service';
import { CreateZentraBudgetItemDto } from './dto/create-zentra-budget-item.dto';
import { UpdateZentraBudgetItemDto } from './dto/update-zentra-budget-item.dto';
import { JwtAuthGuard } from '../../../../auth/shared/guards/jwt-auth.guard';
import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-budget-items')
//@UseGuards(JwtAuthGuard)
export class ZentraBudgetItemController {
  constructor(private readonly zentraBudgetItemService: ZentraBudgetItemService) { }

  @Post()
  create(@Body() createZentraBudgetItemDto: CreateZentraBudgetItemDto) {
    return this.zentraBudgetItemService.create(createZentraBudgetItemDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.zentraBudgetItemService.findAll();
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

  @Get('project/:projectId')
  findAllByProject(@Param('projectId') projectId: string) {
    return this.zentraBudgetItemService.findAllByProject(projectId);
  }

  @Post('category')
  findAllByCategory(@Body() body: { categoryId: string; projectId: string }) {
    return this.zentraBudgetItemService.findAllByCategory(body.categoryId, body.projectId);
  }
  
  @Post('search')
  @Public()
  search(@Body() filters: {
    natureId?: string;
    projectId?: string;
  }) {
    return this.zentraBudgetItemService.findByFilters(filters);
  }

  @Post('search-extra')
  @Public()
  searchExtra(@Body() filters: {
    projectId?: string;
  }) {
    return this.zentraBudgetItemService.findByFiltersExtra(filters);
  }




}