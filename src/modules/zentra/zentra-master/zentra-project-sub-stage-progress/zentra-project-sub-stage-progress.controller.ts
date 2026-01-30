import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Put,
  Delete,
} from '@nestjs/common';
import { ZentraProjectSubStageProgressService } from './zentra-project-sub-stage-progress.service';
import { CreateZentraProjectSubStageProgressDto } from './dto/create-zentra-project-sub-stage-progress.dto';
import { UpdateZentraProjectSubStageProgressDto } from './dto/update-zentra-project-sub-stage-progress.dto';

@Controller('project-sub-stages/:projectSubStageId/progress')
export class ZentraProjectSubStageProgressController {
  constructor(
    private readonly service: ZentraProjectSubStageProgressService,
  ) {}

  @Post()
  create(
    @Param('projectSubStageId') projectSubStageId: string,
    @Body() dto: CreateZentraProjectSubStageProgressDto,
  ) {
    return this.service.create(projectSubStageId, dto);
  }

  @Get()
  findAll(
    @Param('projectSubStageId') projectSubStageId: string,
  ) {
    return this.service.findAllByProjectSubStage(projectSubStageId);
  }

  @Get(':id')
  findOne(
    @Param('projectSubStageId') projectSubStageId: string,
    @Param('id') id: string,
  ) {
    return this.service.findOne(projectSubStageId, id);
  }

  @Put(':id')
  update(
    @Param('projectSubStageId') projectSubStageId: string,
    @Param('id') id: string,
    @Body() dto: UpdateZentraProjectSubStageProgressDto,
  ) {
    return this.service.update(projectSubStageId, id, dto);
  }

  @Delete(':id')
  remove(
    @Param('projectSubStageId') projectSubStageId: string,
    @Param('id') id: string,
  ) {
    return this.service.remove(projectSubStageId, id);
  }

  @Patch(':id/restore')
  restore(
    @Param('projectSubStageId') projectSubStageId: string,
    @Param('id') id: string,
  ) {
    return this.service.restore(projectSubStageId, id);
  }
}