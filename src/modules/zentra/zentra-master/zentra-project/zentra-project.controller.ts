import { Controller, Get, Post, Body, Param, Patch, Put, Delete, UseGuards } from '@nestjs/common';
import { ZentraProjectService } from './zentra-project.service';
import { CreateZentraProjectDto } from './dto/create-zentra-project.dto';
import { UpdateZentraProjectDto } from './dto/update-zentra-project.dto';

@Controller('zentra-projects')
export class ZentraProjectController {
  constructor(private readonly zentraProjectService: ZentraProjectService) { }

  @Post()
  create(@Body() createZentraProjectDto: CreateZentraProjectDto) {
    return this.zentraProjectService.create(createZentraProjectDto);
  }

  @Get()
  findAll() {
    return this.zentraProjectService.findAll();
  }

  @Get('with-details')
  findAllWithDetails() {
    return this.zentraProjectService.findAllWithDetails();
  }

  @Get('with-company')
  findAllWithCompany() {
    return this.zentraProjectService.findAllWithCompany();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraProjectService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateZentraProjectDto: UpdateZentraProjectDto) {
    return this.zentraProjectService.update(id, updateZentraProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraProjectService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraProjectService.restore(id);
  }

  @Get('company/:companyId')
  findAllByCompany(@Param('companyId') companyId: string) {
    return this.zentraProjectService.findAllByCompany(companyId);
  }
  
  @Get('user/:userId')
  findAllWithCompanyUser(@Param('userId') userId: string) {
    return this.zentraProjectService.findAllWithCompanyUser(userId);
  } 



}