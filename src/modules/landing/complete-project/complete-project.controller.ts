import { Controller, Get, Post, Body, Param, Delete, Patch, UseGuards } from '@nestjs/common';
import { CompleteProjectService } from './complete-project.service';
import { CreateCompleteProjectDto } from './dto/create-complete-project.dto';
import { UpdateCompleteProjectDto } from './dto/update-complete-project.dto';

import { JwtAuthGuard } from '../../../auth/shared/guards/jwt-auth.guard'
import { Public } from '../../../auth/shared/decorators/public.decorator'; 

@Controller('complete-projects')
@UseGuards(JwtAuthGuard)
export class CompleteProjectController {
  constructor(private readonly completeProjectService: CompleteProjectService) {}

  @Post()
  create(@Body() createDto: CreateCompleteProjectDto) {
    return this.completeProjectService.create(createDto);
  }

  @Get()
  findAll() {
    return this.completeProjectService.findAll();
  }

  @Get(':pageId/page')
  @Public()
  findAllByPage(@Param('pageId') pageId: string) {
    return this.completeProjectService.findAllByPage(pageId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.completeProjectService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateCompleteProjectDto) {
    return this.completeProjectService.update(id, updateDto);
  }

  @Delete(':id')
  softDelete(@Param('id') id: string) {
    return this.completeProjectService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.completeProjectService.restore(id);
  }
}