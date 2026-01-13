import { Controller, Get, Post, Body, Param, Patch, Put, Delete, UseGuards } from '@nestjs/common';
import { ZentraBankAccountService } from './zentra-bank-account.service';
import { CreateZentraBankAccountDto } from './dto/create-zentra-bank-account.dto';
import { UpdateZentraBankAccountDto } from './dto/update-zentra-bank-account.dto';

@Controller('zentra-bank-accounts')
export class ZentraBankAccountController {
  constructor(private readonly zentraBankAccountService: ZentraBankAccountService) { }

  @Post()
  create(@Body() createZentraBankAccountDto: CreateZentraBankAccountDto) {
    return this.zentraBankAccountService.create(createZentraBankAccountDto);
  }

  @Get()
  findAll() {
    return this.zentraBankAccountService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraBankAccountService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateZentraBankAccountDto: UpdateZentraBankAccountDto) {
    return this.zentraBankAccountService.update(id, updateZentraBankAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraBankAccountService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraBankAccountService.restore(id);
  }

  @Get('project/:projectId')
  findAllByProject(@Param('projectId') projectId: string) {
    return this.zentraBankAccountService.findAllByProject(projectId);
  }

  @Get('company/:companyId')
  findAllByCompany(@Param('companyId') companyId: string) {
    return this.zentraBankAccountService.findAllByCompany(companyId);
  }

}