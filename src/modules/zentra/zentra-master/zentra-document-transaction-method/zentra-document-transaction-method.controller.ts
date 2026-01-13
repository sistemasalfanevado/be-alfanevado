import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Put,
  Delete,
  UseGuards
} from '@nestjs/common';

import { ZentraDocumentTransactionMethodService } from './zentra-document-transaction-method.service';

import { CreateZentraDocumentTransactionMethodDto } from './dto/create-zentra-document-transaction-method.dto';
import { UpdateZentraDocumentTransactionMethodDto } from './dto/update-zentra-document-transaction-method.dto';

@Controller('zentra-document-transaction-methods')
export class ZentraDocumentTransactionMethodController {
  constructor(
    private readonly service: ZentraDocumentTransactionMethodService
  ) { }

  @Post()
  create(@Body() dto: CreateZentraDocumentTransactionMethodDto) {
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
    @Body() dto: UpdateZentraDocumentTransactionMethodDto
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
}