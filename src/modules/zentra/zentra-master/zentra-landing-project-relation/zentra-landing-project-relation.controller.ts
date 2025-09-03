import { 
  Controller, Get, Post, Body, Param, Patch, Put, Delete 
} from '@nestjs/common';
import { ZentraLandingProjectRelationService } from './zentra-landing-project-relation.service';
import { CreateZentraLandingProjectRelationDto } from './dto/create-zentra-landing-project-relation.dto';
import { UpdateZentraLandingProjectRelationDto } from './dto/update-zentra-landing-project-relation.dto';

import { JwtAuthGuard } from '../../../../auth/shared/guards/jwt-auth.guard';
import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-landing-project-relations')
// @UseGuards(JwtAuthGuard)
export class ZentraLandingProjectRelationController {
  constructor(
    private readonly zentraLandingProjectRelationService: ZentraLandingProjectRelationService,
  ) {}

  @Post()
  create(
    @Body() createDto: CreateZentraLandingProjectRelationDto,
  ) {
    return this.zentraLandingProjectRelationService.create(createDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.zentraLandingProjectRelationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraLandingProjectRelationService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateZentraLandingProjectRelationDto,
  ) {
    return this.zentraLandingProjectRelationService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraLandingProjectRelationService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraLandingProjectRelationService.restore(id);
  }
}