import { Controller, Get, Post, Body, Param, Patch, Put, Delete, UseGuards } from '@nestjs/common';
import { ZentraProjectService } from './zentra-project.service';
import { CreateZentraProjectDto } from './dto/create-zentra-project.dto';
import { UpdateZentraProjectDto } from './dto/update-zentra-project.dto';

import { JwtAuthGuard } from '../../../../auth/shared/guards/jwt-auth.guard';
import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-projects')
//@UseGuards(JwtAuthGuard)
export class ZentraProjectController {
  constructor(private readonly zentraProjectService: ZentraProjectService) { }

  @Post()
  create(@Body() createZentraProjectDto: CreateZentraProjectDto) {
    return this.zentraProjectService.create(createZentraProjectDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.zentraProjectService.findAll();
  }

  @Get('with-details')
  findAllWithDetails() {
    return this.zentraProjectService.findAllWithDetails();
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

  

}