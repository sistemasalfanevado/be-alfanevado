import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DateTime } from 'luxon';
import { ZentraAuditLogService } from '../../modules/zentra/zentra-master/zentra-audit-log/zentra-audit-log.service';
import { CreateZentraAuditLogDto } from '../../modules/zentra/zentra-master/zentra-audit-log/dto/create-zentra-audit-log.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  // Inyectamos el servicio de auditoría en lugar de Prisma directamente
  constructor(private readonly auditLogService: ZentraAuditLogService, private readonly jwtService: JwtService) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, params, body, headers } = request;

    // 1. Identificar si es una acción que queremos auditar
    const isDelete = method === 'DELETE';
    const isUpdate = method === 'PUT' || method === 'PATCH';

    if (!isDelete && !isUpdate) {
      return next.handle();
    }

    // 2. Extraer el usuario del token
    let user: any = null;
    if (headers.authorization) {
      try {
        const token = headers.authorization.replace('Bearer ', '');
        const payload: any = this.jwtService.decode(token);
        if (payload) user = { sub: payload.sub };
      } catch (error) {
        console.error('Error al decodificar token:', error.message);
      }
    }

    // 3. Intentar obtener el recordId (Prioridad: params > body)
    const recordId = params.id || body.id || null;

    // Solo procedemos si tenemos usuario e ID del registro
    if (user && recordId) {
      return next.handle().pipe(
        tap(async () => {
          try {
            const urlParts = url.split('/');
            const moduleName = urlParts[1] || 'UNKNOWN';
            const datePeru = DateTime.now().setZone('America/Lima').toJSDate();

            const auditData: CreateZentraAuditLogDto = {
              module: moduleName.toUpperCase(),
              action: method === 'DELETE' ? 'DELETE' : 'UPDATE', // Mapeamos el nombre de la acción
              recordId: String(recordId),
              userId: user.sub,
              localCreatedAt: datePeru,
            };

            await this.auditLogService.create(auditData);
          } catch (error) {
            console.error('Audit Log Error:', error.message);
          }
        }),
      );
    }

    return next.handle();
  }
}