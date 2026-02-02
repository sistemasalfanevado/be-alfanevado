import { Controller, Get, Post, Body, Param, Patch, Put, Delete } from '@nestjs/common';
import { ZentraProjectSubStageProgressFileService } from './zentra-project-sub-stage-progress-file.service';
import { CreateZentraProjectSubStageProgressFileDto } from './dto/create-zentra-project-sub-stage-progress-file.dto';
import { UpdateZentraProjectSubStageProgressFileDto } from './dto/update-zentra-project-sub-stage-progress-file.dto';

@Controller('zentra-project-sub-stage-progress-files')
export class ZentraProjectSubStageProgressFileController {
  constructor(private readonly zentraProjectSubStageProgressFileService: ZentraProjectSubStageProgressFileService) {}

  @Post()
  create(@Body() createDto: CreateZentraProjectSubStageProgressFileDto) {
    return this.zentraProjectSubStageProgressFileService.create(createDto);
  }

  @Get()
  findAll() {
    return this.zentraProjectSubStageProgressFileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraProjectSubStageProgressFileService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateZentraProjectSubStageProgressFileDto) {
    return this.zentraProjectSubStageProgressFileService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraProjectSubStageProgressFileService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraProjectSubStageProgressFileService.restore(id);
  }

  @Get('/by-code/:projectSubStageProgressId')
  findByCode(@Param('projectSubStageProgressId') projectSubStageProgressId: string) {
    return this.zentraProjectSubStageProgressFileService.findByCode(projectSubStageProgressId);
  }
  
}