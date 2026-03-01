import {
  Controller, Get, Post, Body, Param, Patch, Put, Delete
} from '@nestjs/common';
import { ZentraLandingPageRelationService } from './zentra-landing-page-relation.service';
import { CreateZentraLandingPageRelationDto } from './dto/create-zentra-landing-page-relation.dto';
import { UpdateZentraLandingPageRelationDto } from './dto/update-zentra-landing-page-relation.dto';
import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-landing-page-relations')
export class ZentraLandingPageRelationController {
  constructor(
    private readonly zentraLandingPageRelationService: ZentraLandingPageRelationService,
  ) { }

  @Post()
  create(@Body() createDto: CreateZentraLandingPageRelationDto) {
    return this.zentraLandingPageRelationService.create(createDto);
  }

  @Get()
  findAll() {
    return this.zentraLandingPageRelationService.findAll();
  }


  @Get(':id/available-lots')
  @Public()
  getAvailableLots(@Param('id') id: string) {
    return this.zentraLandingPageRelationService.getAvailableLots(id);
  }

  @Get(':id/lots')
  getLotsByProjectId(@Param('id') id: string) {
    return this.zentraLandingPageRelationService.getLotsByProjectId(id);
  }

  // 2. Al final el genérico con ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraLandingPageRelationService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateZentraLandingPageRelationDto) {
    return this.zentraLandingPageRelationService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraLandingPageRelationService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraLandingPageRelationService.restore(id);
  }


  @Post('lots-by-projects')
  getLotsByProjectIds(@Body('projectIds') projectIds: string[]) {
    return this.zentraLandingPageRelationService.getLotsByProjectIds(projectIds);
  }


}