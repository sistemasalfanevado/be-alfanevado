import { Controller, Get, Post, Body, Param, Patch, Put, Delete, UseGuards } from '@nestjs/common';
import { ZentraMovementStatusService } from './zentra-movement-status.service';
import { CreateZentraMovementStatusDto } from './dto/create-zentra-movement-status.dto';
import { UpdateZentraMovementStatusDto } from './dto/update-zentra-movement-status.dto';

import { JwtAuthGuard } from '../../../../auth/shared/guards/jwt-auth.guard';
import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-movement-status')
//@UseGuards(JwtAuthGuard)
export class ZentraMovementStatusController {
  constructor(private readonly zentraMovementStatusService: ZentraMovementStatusService) {}

  @Post()
  create(@Body() createZentraMovementStatusDto: CreateZentraMovementStatusDto) {
    return this.zentraMovementStatusService.create(createZentraMovementStatusDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.zentraMovementStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraMovementStatusService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateZentraMovementStatusDto: UpdateZentraMovementStatusDto) {
    return this.zentraMovementStatusService.update(id, updateZentraMovementStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraMovementStatusService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraMovementStatusService.restore(id);
  }
}