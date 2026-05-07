import { 
  Controller, Get, Post, Body, Param, Patch, Query 
} from '@nestjs/common';
import { ZentraSessionLogService } from './zentra-session-log.service';
import { CreateZentraSessionLogDto } from './dto/create-zentra-session-log.dto';
import { UpdateZentraSessionLogDto } from './dto/update-zentra-session-log.dto';
import { Request } from 'express';
import { Req } from '@nestjs/common';

@Controller('zentra-session-logs')
export class ZentraSessionLogController {
  constructor(private readonly sessionLogService: ZentraSessionLogService) {}

  @Post('login-entry')
  create(
    @Body() createDto: CreateZentraSessionLogDto,
    @Req() request: Request
  ) {
    
    const ip = request.ip || request.headers['x-forwarded-for'] as string;
    return this.sessionLogService.create(createDto, ip);
  }

  @Get()
  findAll() {
    return this.sessionLogService.findAll();
  }

  @Post('search')
  search(@Body() filters: {
    userId?: string;
    startDate?: string;
    endDate?: string;
  }) {
    return this.sessionLogService.findByFilters(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sessionLogService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateDto: UpdateZentraSessionLogDto
  ) {
    return this.sessionLogService.update(id, updateDto);
  }
}