import {
  Controller, Get, Param, UseGuards, Query
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

}