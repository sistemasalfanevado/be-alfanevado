import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Patch,
  NotFoundException,
} from '@nestjs/common';

import { ZentraUserProjectService } from './zentra-user-project.service';
import { CreateZentraUserProjectDto } from './dto/create-zentra-user-project.dto';
import { UpdateZentraUserProjectDto } from './dto/update-zentra-user-project.dto';

@Controller('zentra-user-project')
export class ZentraUserProjectController {
  constructor(private readonly zentraUserProjectService: ZentraUserProjectService) {}

  @Post()
  create(@Body() createZentraUserProjectDto: CreateZentraUserProjectDto) {
    return this.zentraUserProjectService.create(createZentraUserProjectDto);
  }

  @Get()
  findAll() {
    return this.zentraUserProjectService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const record = await this.zentraUserProjectService.findOne(id);
    if (!record) {
      throw new NotFoundException('Relación usuario-proyecto no encontrada');
    }
    return record;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateZentraUserProjectDto: UpdateZentraUserProjectDto,
  ) {
    const record = await this.zentraUserProjectService.findOne(id);
    if (!record) {
      throw new NotFoundException('Relación usuario-proyecto no encontrada');
    }
    return this.zentraUserProjectService.update(id, updateZentraUserProjectDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const record = await this.zentraUserProjectService.findOne(id);
    if (!record) {
      throw new NotFoundException('Relación usuario-proyecto no encontrada');
    }
    return this.zentraUserProjectService.remove(id);
  }

  @Patch(':id/restore')
  async restore(@Param('id') id: string) {
    const record = await this.zentraUserProjectService.findOne(id);
    if (!record) {
      throw new NotFoundException('Relación usuario-proyecto no encontrada');
    }
    return this.zentraUserProjectService.restore(id);
  }
}