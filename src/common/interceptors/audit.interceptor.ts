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
    const { method, url, params, headers } = request;

    let user = request.user;

    if (!user && headers.authorization) {
      try {
        const token = headers.authorization.replace('Bearer ', '');
        const payload: any = this.jwtService.decode(token);

        if (payload) {
          user = { sub: payload.sub, email: payload.email };
        }
      } catch (error) {
        console.error('Error al decodificar token con JwtService:', error.message);
      }
    }

    // Solo auditamos eliminaciones (DELETE) que tengan un ID de registro
    if (method === 'DELETE' && params.id && user) {
      return next.handle().pipe(
        tap(async () => {
          try {
            // 1. Extraer el nombre del módulo de la URL
            const urlParts = url.split('/');
            const moduleName = urlParts[1] || 'UNKNOWN';

            // 2. Generar la fecha local de Perú (UTC-5)
            const datePeru = DateTime.now().setZone('America/Lima').toJSDate();

            // 3. Preparar el objeto siguiendo el CreateZentraAuditLogDto
            const auditData: CreateZentraAuditLogDto = {
              module: moduleName.toUpperCase(),
              action: 'DELETE',
              recordId: params.id,
              userId: user?.sub || '', // ID del usuario desde el JWT
              localCreatedAt: datePeru,
            };

            // 4. Guardar a través del servicio
            await this.auditLogService.create(auditData);

          } catch (error) {
            // Usamos un log silencioso para no interrumpir la experiencia del usuario
            console.error('Audit Log Error:', error.message);
          }
        }),
      );
    }

    return next.handle();
  }
}