import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Patch,
  UseGuards
} from '@nestjs/common';

import { ZentraNotificationCategoryService } from './zentra-notification-category.service';
import { CreateZentraNotificationCategoryDto } from './dto/create-zentra-notification-category.dto';
import { UpdateZentraNotificationCategoryDto } from './dto/update-zentra-notification-category.dto';

@Controller('zentra-notification-categories')
export class ZentraNotificationCategoryController {

  constructor(
    private readonly service: ZentraNotificationCategoryService
  ) { }

  @Post()
  create(
    @Body() dto: CreateZentraNotificationCategoryDto
  ) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string
  ) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateZentraNotificationCategoryDto
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string
  ) {
    return this.service.remove(id);
  }

  @Patch(':id/restore')
  restore(
    @Param('id') id: string
  ) {
    return this.service.restore(id);
  }
}