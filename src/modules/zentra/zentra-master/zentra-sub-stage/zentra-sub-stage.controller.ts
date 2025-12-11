import { Controller, Get, Post, Body, Param, Patch, Put, Delete, UseGuards } from '@nestjs/common';
import { ZentraSubStageService } from './zentra-sub-stage.service';
import { CreateZentraSubStageDto } from './dto/create-zentra-sub-stage.dto';
import { UpdateZentraSubStageDto } from './dto/update-zentra-sub-stage.dto';

import { JwtAuthGuard } from '../../../../auth/shared/guards/jwt-auth.guard';
import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-sub-stages')
//@UseGuards(JwtAuthGuard)
export class ZentraSubStageController {
  constructor(private readonly zentraSubStageService: ZentraSubStageService) { }

  @Post()
  create(@Body() createZentraSubStageDto: CreateZentraSubStageDto) {
    return this.zentraSubStageService.create(createZentraSubStageDto);
  }

  @Get()
  @Public()
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

  // ⭐ Nuevo método: obtener sub-stages por stageId
  @Get('by-stage/:stageId')
  @Public()
  findByStage(@Param('stageId') stageId: string) {
    return this.zentraSubStageService.findByStage(stageId);
  }

  @Post('with-stage')
  @Public()
  findAllWithStage() {
    return this.zentraSubStageService.findAllWithStage();
  }


}