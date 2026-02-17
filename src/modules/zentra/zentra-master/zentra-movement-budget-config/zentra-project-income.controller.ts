import { Controller, Get, Post, Body, Param, Put, Delete, Patch, UseGuards } from '@nestjs/common';
import { ZentraMovementBudgetConfigService } from './zentra-project-income.service';
import { CreateZentraMovementBudgetConfigDto } from './dto/create-zentra-movement-budget-config.dto';
import { UpdateZentraMovementBudgetConfigDto } from './dto/update-zentra-movement-budget-config.dto';

@Controller('zentra-movement-budget-config')
export class ZentraMovementBudgetConfigController {
  constructor(private readonly zentraMovementBudgetConfigService: ZentraMovementBudgetConfigService) {}

  @Post()
  create(@Body() createDto: CreateZentraMovementBudgetConfigDto) {
    return this.zentraMovementBudgetConfigService.create(createDto);
  }

  @Get()
  findAll() {
    return this.zentraMovementBudgetConfigService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraMovementBudgetConfigService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateZentraMovementBudgetConfigDto) {
    return this.zentraMovementBudgetConfigService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraMovementBudgetConfigService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraMovementBudgetConfigService.restore(id);
  }

  @Get('project/:projectId')
  findAllByProject(@Param('projectId') projectId: string) {
    return this.zentraMovementBudgetConfigService.findAllByProject(projectId);
  }

}