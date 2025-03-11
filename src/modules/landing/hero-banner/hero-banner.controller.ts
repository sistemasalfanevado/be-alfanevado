import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Patch } from '@nestjs/common';
import { HeroBannerService } from './hero-banner.service';
import { CreateHeroBannerDto } from './dto/create-hero-banner.dto';
import { UpdateHeroBannerDto } from './dto/update-hero-banner.dto';

import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard'
import { Public } from '../../../auth/decorators/public.decorator'; 

@Controller('hero-banner')
@UseGuards(JwtAuthGuard)
export class HeroBannerController {
  constructor(private readonly heroBannerService: HeroBannerService) { }

  @Post()
  create(@Body() createHeroBannerDto: CreateHeroBannerDto) {
    return this.heroBannerService.create(createHeroBannerDto);
  }

  @Get()
  findAll() {
    return this.heroBannerService.findAll();
  }

  @Get(':pageId/page')
  @Public()
  findAllByPage(@Param('pageId') pageId: string) {
    return this.heroBannerService.findAllByPage(pageId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.heroBannerService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateHeroBannerDto: UpdateHeroBannerDto) {
    return this.heroBannerService.update(id, updateHeroBannerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.heroBannerService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.heroBannerService.restore(id);
  }
}