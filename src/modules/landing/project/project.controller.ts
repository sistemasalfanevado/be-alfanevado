import { Controller, Get, Post, Body, Put, Param, Delete, Patch, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

import { AuthGuard } from '@nestjs/passport';

@Controller('project')
//@UseGuards(AuthGuard('jwt'))
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':pageId/page')
  findAllByPage(@Param('pageId') pageId: string) {
    return this.projectService.findAllByPage(pageId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(id);
  }

  @Patch(':id/restore') // Endpoint para restaurar un registro eliminado
  restore(@Param('id') id: string) {
    return this.projectService.restore(id);
  }
}