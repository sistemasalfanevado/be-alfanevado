import {
  Controller, Get, Post, Body, Param, Patch, Put, Delete, UseGuards
} from '@nestjs/common';
import { ZentraInstallmentService } from './zentra-installment.service';
import { CreateZentraInstallmentDto } from './dto/create-zentra-installment.dto';
import { UpdateZentraInstallmentDto } from './dto/update-zentra-installment.dto';

import { JwtAuthGuard } from '../../../../auth/shared/guards/jwt-auth.guard';
import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-installments')
//@UseGuards(JwtAuthGuard)
export class ZentraInstallmentController {
  constructor(
    private readonly zentraInstallmentService: ZentraInstallmentService,
  ) { }

  @Post()
  create(@Body() createZentraInstallmentDto: CreateZentraInstallmentDto) {
    return this.zentraInstallmentService.create(createZentraInstallmentDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.zentraInstallmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraInstallmentService.findOne(id);
  }

  @Get('scheduled/:id')
  @Public()
  findAllByScheduled(@Param('id') scheduledIncomeDocumentId: string) {
    return this.zentraInstallmentService.findAllByScheduled(scheduledIncomeDocumentId);
  }



  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateZentraInstallmentDto: UpdateZentraInstallmentDto
  ) {
    return this.zentraInstallmentService.update(id, updateZentraInstallmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraInstallmentService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraInstallmentService.restore(id);
  }

  @Post('movement')
  createMovement(@Body() createDataDto: any) {
    return this.zentraInstallmentService.addMovement(createDataDto);
  }

  @Delete('movement/:id')
  removeMovement(@Param('id') id: string) {
    return this.zentraInstallmentService.removeMovement(id);
  }

  @Put('movement/:id')
  updateMovement(@Param('id') id: string, @Body() updateDataDto: any) {
    return this.zentraInstallmentService.updateMovement(id, updateDataDto);
  }

  @Post('debts-year')
  findDebtsThisYear(@Body() body: { year: number }) {
    return this.zentraInstallmentService.findDebtsYear(body.year);
  }

  @Post('debts-all')
  findDebtsAll(@Body() body: { projectId: string }) {
    return this.zentraInstallmentService.findDebtsAll(body.projectId);
  }



}