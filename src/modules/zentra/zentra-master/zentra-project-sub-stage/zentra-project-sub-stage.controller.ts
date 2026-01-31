import { Controller, Get, Post, Body, Param, Patch, Put, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ZentraProjectSubStageService } from './zentra-project-sub-stage.service';
import { CreateZentraProjectSubStageDto } from './dto/create-zentra-project-sub-stage.dto';
import { UpdateZentraProjectSubStageDto } from './dto/update-zentra-project-sub-stage.dto';

@Controller('zentra-project-sub-stages')
export class ZentraProjectSubStageController {
  constructor(private readonly projectSubStageService: ZentraProjectSubStageService) { }

  @Post()
  create(@Body() createDto: CreateZentraProjectSubStageDto) {
    return this.projectSubStageService.create(createDto);
  }

  @Get()
  findAll() {
    return this.projectSubStageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectSubStageService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateZentraProjectSubStageDto
  ) {
    return this.projectSubStageService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectSubStageService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.projectSubStageService.restore(id);
  }

  @Get('project/:projectId')
  findAllByProject(@Param('projectId') projectId: string) {
    return this.projectSubStageService.findAllByProject(projectId);
  }
  
}