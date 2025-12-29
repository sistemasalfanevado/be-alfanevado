import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Patch
} from '@nestjs/common';

import { ZentraPettyCashStatusService } from './zentra-petty-cash-status.service';
import { CreateZentrPettyCashStatusDto } from './dto/create-zentra-petty-cash-status.dto';
import { UpdateZentrPettyCashStatusDto } from './dto/update-zentra-petty-cash-status.dto';

import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-petty-cash-status')
export class ZentraPettyCashStatusController {
  constructor(
    private readonly zentraPettyCashStatusService: ZentraPettyCashStatusService
  ) {}

  @Post()
  create(@Body() dto: CreateZentrPettyCashStatusDto) {
    return this.zentraPettyCashStatusService.create(dto);
  }

  @Get()
  @Public()
  findAll() {
    return this.zentraPettyCashStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraPettyCashStatusService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateZentrPettyCashStatusDto
  ) {
    return this.zentraPettyCashStatusService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraPettyCashStatusService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraPettyCashStatusService.restore(id);
  }
}