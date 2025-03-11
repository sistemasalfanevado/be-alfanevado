import { Controller, Get, Post, Body, Put, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { FooterLinkService } from './footer-link.service';
import { CreateFooterLinkDto } from './dto/create-footer-link.dto';
import { UpdateFooterLinkDto } from './dto/update-footer-link.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('footer-link')
@UseGuards(AuthGuard('jwt'))
export class FooterLinkController {
  constructor(private readonly footerLinkService: FooterLinkService) { }

  @Post()
  create(@Body() createFooterLinkDto: CreateFooterLinkDto) {
    return this.footerLinkService.create(createFooterLinkDto);
  }

  @Get()
  findAll() {
    return this.footerLinkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.footerLinkService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateFooterLinkDto: UpdateFooterLinkDto) {
    return this.footerLinkService.update(id, updateFooterLinkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.footerLinkService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.footerLinkService.restore(id);
  }
}