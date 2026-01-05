import { Module, Global } from '@nestjs/common';
import { ZentraAuditLogService } from './zentra-audit-log.service';
import { ZentraAuditLogController } from './zentra-audit-log.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';

@Global() // 1. Lo hacemos global
@Module({
  imports: [PrismaModule],
  providers: [ZentraAuditLogService],
  controllers: [ZentraAuditLogController],
  exports: [ZentraAuditLogService], // 2. Exportamos el servicio
})
export class ZentraAuditLogModule {}