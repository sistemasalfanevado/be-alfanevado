import {
  Controller, Get, Param, UseGuards, Query, Post, Body
} from '@nestjs/common';
import { ZentraAuditLogService } from './zentra-audit-log.service';
import { JwtAuthGuard } from '../../../../auth/shared/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('zentra-audit-logs')
export class ZentraAuditLogController {
  constructor(private readonly zentraAuditLogService: ZentraAuditLogService) { }

  @Get()
  findAll() {
    return this.zentraAuditLogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraAuditLogService.findOne(id);
  }

  @Post('search')
  search(@Body() filters: {
    userId?: string;
    startDate?: string;
    endDate?: string;
  }) {
    return this.zentraAuditLogService.findByFilters(filters);
  }

}