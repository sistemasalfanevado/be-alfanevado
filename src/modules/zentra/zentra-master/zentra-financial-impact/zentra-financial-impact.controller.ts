import { Controller, Get, Post, Body, Param, Patch, Put, Delete } from '@nestjs/common';
import { ZentraFinancialImpactService } from './zentra-financial-impact.service';
import { CreateZentraFinancialImpactDto } from './dto/create-zentra-financial-impact.dto';
import { UpdateZentraFinancialImpactDto } from './dto/update-zentra-financial-impact.dto';
import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-financial-impact')
export class ZentraFinancialImpactController {
  constructor(
    private readonly zentraFinancialImpactService: ZentraFinancialImpactService,
  ) {}

  @Post()
  create(@Body() createDto: CreateZentraFinancialImpactDto) {
    return this.zentraFinancialImpactService.create(createDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.zentraFinancialImpactService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraFinancialImpactService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateZentraFinancialImpactDto,
  ) {
    return this.zentraFinancialImpactService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraFinancialImpactService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraFinancialImpactService.restore(id);
  }
}