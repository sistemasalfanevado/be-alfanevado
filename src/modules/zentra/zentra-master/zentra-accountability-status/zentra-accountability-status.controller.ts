import { 
  Controller, Get, Post, Body, Param, Patch, Put, Delete 
} from '@nestjs/common';

import { ZentraAccountabilityStatusService } from './zentra-accountability-status.service';
import { CreateZentraAccountabilityStatusDto } from './dto/create-zentra-accountability-status.dto';
import { UpdateZentraAccountabilityStatusDto } from './dto/update-zentra-accountability-status.dto';

@Controller('zentra-accountability-status')
export class ZentraAccountabilityStatusController {
  constructor(
    private readonly zentraAccountabilityStatusService: ZentraAccountabilityStatusService
  ) {}

  @Post()
  create(@Body() dto: CreateZentraAccountabilityStatusDto) {
    return this.zentraAccountabilityStatusService.create(dto);
  }

  @Get()
  findAll() {
    return this.zentraAccountabilityStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraAccountabilityStatusService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateZentraAccountabilityStatusDto) {
    return this.zentraAccountabilityStatusService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraAccountabilityStatusService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraAccountabilityStatusService.restore(id);
  }
}