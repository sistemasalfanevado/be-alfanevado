import { Controller, Get, Post, Body, Param, Patch, Put, Delete, UseGuards } from '@nestjs/common';
import { ZentraBankAccountTypeService } from './zentra-bank-account-type.service';
import { CreateZentraBankAccountTypeDto } from './dto/create-zentra-bank-account-type.dto';
import { UpdateZentraBankAccountTypeDto } from './dto/update-zentra-bank-account-type.dto';

import { JwtAuthGuard } from '../../../../auth/shared/guards/jwt-auth.guard';
import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-bank-account-types')
//@UseGuards(JwtAuthGuard)
export class ZentraBankAccountTypeController {
  constructor(private readonly zentraBankAccountTypeService: ZentraBankAccountTypeService) {}

  @Post()
  create(@Body() createDto: CreateZentraBankAccountTypeDto) {
    return this.zentraBankAccountTypeService.create(createDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.zentraBankAccountTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraBankAccountTypeService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateZentraBankAccountTypeDto) {
    return this.zentraBankAccountTypeService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraBankAccountTypeService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraBankAccountTypeService.restore(id);
  }
}