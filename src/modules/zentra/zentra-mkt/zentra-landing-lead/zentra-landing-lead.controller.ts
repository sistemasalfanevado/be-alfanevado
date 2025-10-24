import { Controller, Get, Post, Body, Param, Put, Delete, Patch } from '@nestjs/common';
import { ZentraLandingLeadService } from './zentra-landing-lead.service';
import { CreateZentraLandingLeadDto } from './dto/create-zentra-landing-lead.dto';
import { UpdateZentraLandingLeadDto } from './dto/update-zentra-landing-lead.dto';
import { JwtAuthGuard } from '../../../../auth/shared/guards/jwt-auth.guard';
import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-landing-leads')
//@UseGuards(JwtAuthGuard)
export class ZentraLandingLeadController {
  constructor(private readonly zentraLandingLeadService: ZentraLandingLeadService) {}

  @Post()
  @Public()
  create(@Body() createZentraLandingLeadDto: CreateZentraLandingLeadDto) {
    return this.zentraLandingLeadService.create(createZentraLandingLeadDto);
  }

  @Get()
  findAll() {
    return this.zentraLandingLeadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraLandingLeadService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateZentraLandingLeadDto: UpdateZentraLandingLeadDto) {
    return this.zentraLandingLeadService.update(id, updateZentraLandingLeadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraLandingLeadService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraLandingLeadService.restore(id);
  }
}