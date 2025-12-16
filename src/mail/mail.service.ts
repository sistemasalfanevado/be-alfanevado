import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { defaultTemplate } from './templates/default.template';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly mailerService: MailerService, private prisma: PrismaService) { }

  async sendTestEmail(to: string) {
    try {
      await this.mailerService.sendMail({
        to,
        subject: '✅ Prueba de notificación',
        html: defaultTemplate({
          title: 'Notificación de prueba',
          message: 'Este correo confirma que el servicio de correos funciona correctamente.',
        }),
      });

      return { message: 'Correo enviado correctamente' };
    } catch (error) {
      this.logger.error('Error enviando correo', error);
      throw error;
    }
  }

  async sendCustomEmail(
    to: string,
    subject: string,
    title: string,
    message: string,
  ) {
    return this.mailerService.sendMail({
      to,
      subject,
      html: defaultTemplate({
        title,
        message,
      }),
    });
  }


  async notifyDocumentsPaid(
    documentList: { documentId: string; documentUrl: string }[],
  ) {
    // 🔹 Mapa documentId → documentUrl (Firebase)
    const documentUrlMap = new Map<string, string>();

    for (const doc of documentList) {
      documentUrlMap.set(doc.documentId, doc.documentUrl);
    }

    // 🔹 1️⃣ Buscar documentos con su usuario creador
    const dbDocuments = await this.prisma.zentraDocument.findMany({
      where: {
        id: { in: documentList.map(d => d.documentId) },
        deletedAt: null,
      },
      select: {
        id: true,
        code: true,
        description: true,
        user: {
          select: {
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    // 🔹 2️⃣ Agrupar por usuario (evitar correos duplicados)
    const notificationsMap = new Map<
      string,
      {
        email: string;
        fullName: string;
        documents: {
          code: string;
          description: string;
          url: string;
        }[];
      }
    >();

    for (const doc of dbDocuments) {
      if (!doc.user?.email) continue;

      if (!notificationsMap.has(doc.user.email)) {
        notificationsMap.set(doc.user.email, {
          email: doc.user.email,
          fullName: `${doc.user.firstName} ${doc.user.lastName}`,
          documents: [],
        });
      }

      notificationsMap.get(doc.user.email)!.documents.push({
        code: doc.code ?? doc.id,
        description: doc.description ?? '',
        url: documentUrlMap.get(doc.id) ?? '#',
      });
    }

    // 🔹 3️⃣ Enviar correos (1 por usuario)
    for (const [, notification] of notificationsMap) {
      const documentsHtml = notification.documents
        .map(
          d => `
        <li style="margin-bottom: 12px;">
          <strong>${d.code}</strong><br />
          ${d.description}<br />
          <a href="${d.url}" target="_blank" style="color:#2563eb;">
            📎 Ver documento
          </a>
        </li>
      `,
        )
        .join('');

      await this.sendCustomEmail(
        notification.email,
        '💰 Documentos pagados',
        'Pago confirmado',
        `
      Hola ${notification.fullName},<br /><br />

      Te informamos que los siguientes documentos ya fueron pagados:<br /><br />

      <ul>
        ${documentsHtml}
      </ul>

      <br />
      Gracias,<br />
      <strong>Alfa Nevado</strong>
      `,
      );
    }

    // 🔹 4️⃣ Respuesta final
    return {
      totalDocuments: dbDocuments.length,
      totalUsersNotified: notificationsMap.size,
    };
  }





}