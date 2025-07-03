import { Controller, Get, Post, Body, Param, Patch, Put, Delete, UseGuards } from '@nestjs/common';
import { FooterContactService } from './footer-contact.service';
import { CreateFooterContactDto } from './dto/create-footer-contact.dto';
import { UpdateFooterContactDto } from './dto/update-footer-contact.dto';

import { JwtAuthGuard } from '../../../../auth/shared/guards/jwt-auth.guard'
import { Public } from '../../../../auth/shared/decorators/public.decorator'; 

@Controller('footer-contact')
@UseGuards(JwtAuthGuard)
export class FooterContactController {

  constructor(private readonly footerContactService: FooterContactService) { }

  @Post()
  create(@Body() createFooterContactDto: CreateFooterContactDto) {
    return this.footerContactService.create(createFooterContactDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.footerContactService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.footerContactService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateFooterContactDto: UpdateFooterContactDto) {
    return this.footerContactService.update(id, updateFooterContactDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.footerContactService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.footerContactService.restore(id);
  }
}