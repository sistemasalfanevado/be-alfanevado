import { Controller, Get, Post, Body, Put, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FooterSocialService } from './footer-social.service';
import { CreateFooterSocialDto } from './dto/create-footer-social.dto';
import { UpdateFooterSocialDto } from './dto/update-footer-social.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('footer-social')
//@UseGuards(AuthGuard('jwt'))
export class FooterSocialController {
  constructor(private readonly footerSocialService: FooterSocialService) {}

  @Post()
  create(@Body() createFooterSocialDto: CreateFooterSocialDto) {
    return this.footerSocialService.create(createFooterSocialDto);
  }

  @Get()
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