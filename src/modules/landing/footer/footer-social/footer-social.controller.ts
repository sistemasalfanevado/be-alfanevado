import { Controller, Get, Post, Body, Put, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FooterSocialService } from './footer-social.service';
import { CreateFooterSocialDto } from './dto/create-footer-social.dto';
import { UpdateFooterSocialDto } from './dto/update-footer-social.dto';

import { JwtAuthGuard } from '../../../../auth/shared/guards/jwt-auth.guard'
import { Public } from '../../../../auth/shared/decorators/public.decorator'; 


@Controller('footer-social')
@UseGuards(JwtAuthGuard)
export class FooterSocialController {
  constructor(private readonly footerSocialService: FooterSocialService) {}

  @Post()
  create(@Body() createFooterSocialDto: CreateFooterSocialDto) {
    return this.footerSocialService.create(createFooterSocialDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.footerSocialService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.footerSocialService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateFooterSocialDto: UpdateFooterSocialDto) {
    return this.footerSocialService.update(id, updateFooterSocialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.footerSocialService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.footerSocialService.restore(id);
  }
}