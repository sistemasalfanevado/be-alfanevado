import { Controller, Get, Post, Body, Param, Patch, Put, Delete, UseGuards } from '@nestjs/common';
import { ZentraBankService } from './zentra-bank.service';
import { CreateZentraBankDto } from './dto/create-zentra-bank.dto';
import { UpdateZentraBankDto } from './dto/update-zentra-bank.dto';

import { JwtAuthGuard } from '../../../../auth/shared/guards/jwt-auth.guard';
import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-banks')
//@UseGuards(JwtAuthGuard)
export class ZentraBankController {
  constructor(private readonly zentraBankService: ZentraBankService) {}

  @Post()
  create(@Body() createZentraBankDto: CreateZentraBankDto) {
    return this.zentraBankService.create(createZentraBankDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.zentraBankService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraBankService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateZentraBankDto: UpdateZentraBankDto) {
    return this.zentraBankService.update(id, updateZentraBankDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraBankService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraBankService.restore(id);
  }
}