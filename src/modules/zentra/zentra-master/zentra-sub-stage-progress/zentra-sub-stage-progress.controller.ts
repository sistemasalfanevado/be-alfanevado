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
import { ZentraSubStageProgressService } from './zentra-sub-stage-progress.service';
import { CreateZentraSubStageProgressDto } from './dto/create-zentra-sub-stage-progress.dto';
import { UpdateZentraSubStageProgressDto } from './dto/update-zentra-sub-stage-progress.dto';


@Controller('zentra-sub-stage-progress')
export class ZentraSubStageProgressController {
  constructor(
    private readonly service: ZentraSubStageProgressService,
  ) { }

  @Post()
  create(@Body() dto: CreateZentraSubStageProgressDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateZentraSubStageProgressDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.service.restore(id);
  }

  @Get('by-sub-stage/:subStageId')
  findBySubStage(@Param('subStageId') subStageId: string) {
    return this.service.findBySubStage(subStageId);
  }

  @Get('by-project/:projectId')
  findByProject(@Param('projectId') projectId: string) {
    return this.service.findByProject(projectId);
  }

  @Post('by-sub-stage-and-project')
  findBySubStageAndProject(
    @Body() filters: {
      subStageId: string;
      projectId: string;
    }
  ) {
    return this.service.findBySubStageAndProject(filters);
  }



}