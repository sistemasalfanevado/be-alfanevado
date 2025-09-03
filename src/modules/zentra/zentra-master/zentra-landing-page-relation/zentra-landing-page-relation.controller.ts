import { 
  Controller, Get, Post, Body, Param, Patch, Put, Delete 
} from '@nestjs/common';
import { ZentraLandingPageRelationService } from './zentra-landing-page-relation.service';
import { CreateZentraLandingPageRelationDto } from './dto/create-zentra-landing-page-relation.dto';
import { UpdateZentraLandingPageRelationDto } from './dto/update-zentra-landing-page-relation.dto';

import { JwtAuthGuard } from '../../../../auth/shared/guards/jwt-auth.guard';
import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-landing-page-relations')
// @UseGuards(JwtAuthGuard)
export class ZentraLandingPageRelationController {
  constructor(
    private readonly zentraLandingPageRelationService: ZentraLandingPageRelationService,
  ) {}

  @Post()
  create(
    @Body() createDto: CreateZentraLandingPageRelationDto,
  ) {
    return this.zentraLandingPageRelationService.create(createDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.zentraLandingPageRelationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraLandingPageRelationService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateZentraLandingPageRelationDto,
  ) {
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
}