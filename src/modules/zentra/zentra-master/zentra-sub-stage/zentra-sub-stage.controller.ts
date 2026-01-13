import { Controller, Get, Post, Body, Param, Patch, Put, Delete, UseGuards } from '@nestjs/common';
import { ZentraSubStageService } from './zentra-sub-stage.service';
import { CreateZentraSubStageDto } from './dto/create-zentra-sub-stage.dto';
import { UpdateZentraSubStageDto } from './dto/update-zentra-sub-stage.dto';

@Controller('zentra-sub-stages')
export class ZentraSubStageController {
  constructor(private readonly zentraSubStageService: ZentraSubStageService) { }

  @Post()
  create(@Body() createZentraSubStageDto: CreateZentraSubStageDto) {
    return this.zentraSubStageService.create(createZentraSubStageDto);
  }

  @Get()
  findAll() {
    return this.zentraSubStageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraSubStageService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateZentraSubStageDto: UpdateZentraSubStageDto) {
    return this.zentraSubStageService.update(id, updateZentraSubStageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraSubStageService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraSubStageService.restore(id);
  }

  @Get('by-stage/:stageId')
  findByStage(@Param('stageId') stageId: string) {
    return this.zentraSubStageService.findByStage(stageId);
  }

  @Post('with-stage')
  findAllWithStage() {
    return this.zentraSubStageService.findAllWithStage();
  }


}