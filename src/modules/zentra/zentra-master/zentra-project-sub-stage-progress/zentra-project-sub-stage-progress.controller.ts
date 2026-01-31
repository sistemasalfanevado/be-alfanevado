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

@Controller('zentra-project-sub-stages-progress')
export class ZentraProjectSubStageProgressController {
  constructor(
    private readonly service: ZentraProjectSubStageProgressService,
  ) { }

  @Post()
  create(
    @Body() dto: CreateZentraProjectSubStageProgressDto,
  ) {
    return this.service.create(dto);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateZentraProjectSubStageProgressDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    return this.service.remove(id);
  }

  @Patch(':id/restore')
  restore(
    @Param('id') id: string,
  ) {
    return this.service.restore(id);
  }

  @Get('by-project-sub-stage/:projectSubStageId')
  findAllByProjectSubStage(
    @Param('projectSubStageId') projectSubStageId: string,
  ) {
    return this.service.findAllByProjectSubStage(projectSubStageId);
  }

}