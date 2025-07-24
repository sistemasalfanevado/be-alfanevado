import { Controller, Get, Post, Body, Param, Patch, Put, Delete, UseGuards } from '@nestjs/common';
import { ZentraCompanyService } from './zentra-company.service';
import { CreateZentraCompanyDto } from './dto/create-zentra-company.dto';
import { UpdateZentraCompanyDto } from './dto/update-zentra-company.dto';

import { JwtAuthGuard } from '../../../../auth/shared/guards/jwt-auth.guard';
import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-companies')
//@UseGuards(JwtAuthGuard)
export class ZentraCompanyController {
  constructor(private readonly zentraCompanyService: ZentraCompanyService) {}

  @Post()
  create(@Body() createZentraCompanyDto: CreateZentraCompanyDto) {
    return this.zentraCompanyService.create(createZentraCompanyDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.zentraCompanyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraCompanyService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateZentraCompanyDto: UpdateZentraCompanyDto) {
    return this.zentraCompanyService.update(id, updateZentraCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraCompanyService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraCompanyService.restore(id);
  }
}