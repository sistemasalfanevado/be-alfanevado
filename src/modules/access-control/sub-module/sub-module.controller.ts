import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { SubModuleService } from './sub-module.service';
import { CreateSubModuleDto } from './dto/create-sub-module.dto';
import { UpdateSubModuleDto } from './dto/update-sub-module.dto';

@Controller('sub-module')
export class SubModuleController {
  constructor(private readonly subModuleService: SubModuleService) {}

  @Post()
  create(@Body() createSubModuleDto: CreateSubModuleDto) {
    return this.subModuleService.create(createSubModuleDto);
  }

  @Get()
  findAll() {
    return this.subModuleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subModuleService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSubModuleDto: UpdateSubModuleDto) {
    return this.subModuleService.update(id, updateSubModuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subModuleService.remove(id);
  }
}