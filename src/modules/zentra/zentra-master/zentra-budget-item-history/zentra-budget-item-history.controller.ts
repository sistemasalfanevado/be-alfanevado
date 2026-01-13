import { Controller, Get, Post, Body, Param, Patch, Put, Delete } from '@nestjs/common';
import { ZentraBudgetItemHistoryService } from './zentra-budget-item-history.service';
import { CreateZentraBudgetItemHistoryDto } from './dto/create-zentra-budget-item-history.dto';
import { UpdateZentraBudgetItemHistoryDto } from './dto/update-zentra-budget-item-history.dto';

@Controller('zentra-budget-item-history')
export class ZentraBudgetItemHistoryController {
  constructor(
    private readonly zentraBudgetItemHistoryService: ZentraBudgetItemHistoryService,
  ) {}

  @Post()
  create(@Body() createDto: CreateZentraBudgetItemHistoryDto) {
    return this.zentraBudgetItemHistoryService.create(createDto);
  }

  @Get()
  findAll() {
    return this.zentraBudgetItemHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraBudgetItemHistoryService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateZentraBudgetItemHistoryDto,
  ) {
    return this.zentraBudgetItemHistoryService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraBudgetItemHistoryService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraBudgetItemHistoryService.restore(id);
  }

  @Get('budget-item/:budgetItemId')
  findByBudgetItem(@Param('budgetItemId') budgetItemId: string) {
    return this.zentraBudgetItemHistoryService.findByBudgetItem(budgetItemId);
  }
}