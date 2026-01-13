import { Controller, Get, Post, Body, Param, Patch, Put, Delete, UseGuards } from '@nestjs/common';
import { ZentraBudgetNatureService } from './zentra-budget-nature.service';
import { CreateZentraBudgetNatureDto } from './dto/create-zentra-budget-nature.dto';
import { UpdateZentraBudgetNatureDto } from './dto/update-zentra-budget-nature.dto';

@Controller('zentra-budget-natures')
export class ZentraBudgetNatureController {
  constructor(private readonly zentraBudgetNatureService: ZentraBudgetNatureService) {}

  @Post()
  create(@Body() createZentraBudgetNatureDto: CreateZentraBudgetNatureDto) {
    return this.zentraBudgetNatureService.create(createZentraBudgetNatureDto);
  }

  @Get()
  findAll() {
    return this.zentraBudgetNatureService.findAll();
  }

  @Get('complete')
  findSimple() {
    return this.zentraBudgetNatureService.findAllComplete();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraBudgetNatureService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string, 
    @Body() updateZentraBudgetNatureDto: UpdateZentraBudgetNatureDto,
  ) {
    return this.zentraBudgetNatureService.update(id, updateZentraBudgetNatureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraBudgetNatureService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraBudgetNatureService.restore(id);
  }
}