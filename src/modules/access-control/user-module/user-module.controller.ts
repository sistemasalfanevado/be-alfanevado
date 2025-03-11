import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UserModuleService } from './user-module.service';
import { CreateUserModuleDto } from './dto/create-user-module.dto';
import { UpdateUserModuleDto } from './dto/update-user-module.dto';

@Controller('user-module')
export class UserModuleController {
  constructor(private readonly userModuleService: UserModuleService) {}

  @Post()
  create(@Body() createUserModuleDto: CreateUserModuleDto) {
    return this.userModuleService.create(createUserModuleDto);
  }

  @Get()
  findAll() {
    return this.userModuleService.findAll();
  }

  @Get(':userId/:moduleId')
  findOne(
    @Param('userId') userId: string,
    @Param('moduleId') moduleId: string,
  ) {
    return this.userModuleService.findOne(userId, moduleId);
  }

  @Put(':userId/:moduleId')
  update(
    @Param('userId') userId: string,
    @Param('moduleId') moduleId: string,
    @Body() updateUserModuleDto: UpdateUserModuleDto,
  ) {
    return this.userModuleService.update(userId, moduleId, updateUserModuleDto);
  }

  @Delete(':userId/:moduleId')
  remove(
    @Param('userId') userId: string,
    @Param('moduleId') moduleId: string,
  ) {
    return this.userModuleService.remove(userId, moduleId);
  }
}