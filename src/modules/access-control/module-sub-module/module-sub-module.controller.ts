import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ModuleSubModuleService } from './module-sub-module.service';
import { CreateModuleSubModuleDto } from './dto/create-module-sub-module.dto';
import { UpdateModuleSubModuleDto } from './dto/update-module-sub-module.dto';

@Controller('module-sub-module')
export class ModuleSubModuleController {
  constructor(private readonly moduleSubModuleService: ModuleSubModuleService) {}

  @Post()
  create(@Body() createModuleSubModuleDto: CreateModuleSubModuleDto) {
    return this.moduleSubModuleService.create(createModuleSubModuleDto);
  }

  @Get()
  findAll() {
    return this.moduleSubModuleService.findAll();
  }

  @Get(':moduleId/:subModuleId')
  findOne(
    @Param('moduleId') moduleId: string,
    @Param('subModuleId') subModuleId: string,
  ) {
    return this.moduleSubModuleService.findOne(moduleId, subModuleId);
  }

  @Put(':moduleId/:subModuleId')
  update(
    @Param('moduleId') moduleId: string,
    @Param('subModuleId') subModuleId: string,
    @Body() updateModuleSubModuleDto: UpdateModuleSubModuleDto,
  ) {
    return this.moduleSubModuleService.update(
      moduleId,
      subModuleId,
      updateModuleSubModuleDto,
    );
  }

  @Delete(':moduleId/:subModuleId')
  remove(
    @Param('moduleId') moduleId: string,
    @Param('subModuleId') subModuleId: string,
  ) {
    return this.moduleSubModuleService.remove(moduleId, subModuleId);
  }
}