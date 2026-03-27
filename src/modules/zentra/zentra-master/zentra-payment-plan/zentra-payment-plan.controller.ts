import { Controller, Get, Post, Body, Param, Patch, Put, Delete, UseGuards } from '@nestjs/common';
import { ZentraPaymentPlanService } from './zentra-payment-plan.service';
import { CreateZentraPaymentPlanDto } from './dto/create-zentra-payment-plan.dto';
import { UpdateZentraPaymentPlanDto } from './dto/update-zentra-payment-plan.dto';

@Controller('zentra-payment-plans')
export class ZentraPaymentPlanController {
  constructor(private readonly zentraPaymentPlanService: ZentraPaymentPlanService) {}

  @Post()
  create(@Body() createZentraPaymentPlanDto: CreateZentraPaymentPlanDto) {
    return this.zentraPaymentPlanService.create(createZentraPaymentPlanDto);
  }

  @Get()
  findAll() {
    return this.zentraPaymentPlanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraPaymentPlanService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateZentraPaymentPlanDto: UpdateZentraPaymentPlanDto) {
    return this.zentraPaymentPlanService.update(id, updateZentraPaymentPlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraPaymentPlanService.remove(id);
  }
  
  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraPaymentPlanService.restore(id);
  }
}