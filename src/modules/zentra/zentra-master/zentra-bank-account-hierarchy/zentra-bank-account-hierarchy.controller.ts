import { Controller, Get, Post, Body, Param, Patch, Put, Delete, UseGuards } from '@nestjs/common';
import { ZentraBankAccountHierarchyService } from './zentra-bank-account-hierarchy.service';
import { CreateZentraBankAccountHierarchyDto } from './dto/create-zentra-bank-account-hierarchy.dto';
import { UpdateZentraBankAccountHierarchyDto } from './dto/update-zentra-bank-account-hierarchy.dto';

import { JwtAuthGuard } from '../../../../auth/shared/guards/jwt-auth.guard';
import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-bank-account-hierarchies')
//@UseGuards(JwtAuthGuard)
export class ZentraBankAccountHierarchyController {
  constructor(
    private readonly zentraBankAccountHierarchyService: ZentraBankAccountHierarchyService,
  ) {}

  @Post()
  create(@Body() createDto: CreateZentraBankAccountHierarchyDto) {
    return this.zentraBankAccountHierarchyService.create(createDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.zentraBankAccountHierarchyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraBankAccountHierarchyService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateZentraBankAccountHierarchyDto) {
    return this.zentraBankAccountHierarchyService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraBankAccountHierarchyService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraBankAccountHierarchyService.restore(id);
  }
}