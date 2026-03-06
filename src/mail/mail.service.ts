import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { defaultTemplate } from './templates/default.template';
import { PrismaService } from '../prisma/prisma.service';
import { CURRENCY, NOTIFICATION_CATEGORY } from 'src/shared/constants/app.constants';

import * as moment from 'moment';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly mailerService: MailerService, private prisma: PrismaService) { }

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
    documentList: {
      documentId: string;
      documentUrl: string;
      partyName: string;
      documentCode: string;
      documentDescription: string;
      currencyName: string;
      amount: string;
    }[],
  ) {
    if (!documentList.length) return { sent: 0 };

    const documentUrl = documentList[0].documentUrl;

    const recipients = await this.prisma.zentraNotificationRecipient.findMany({
      where: {
        deletedAt: null,
        notificationCategoryId: NOTIFICATION_CATEGORY.DOCUMENTO_PAGADO
      },
      include: {
        user: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
      },
    });

    const documentIds = documentList.map((d) => d.documentId);
    const documentsFromDb = await this.prisma.zentraDocument.findMany({
      where: { id: { in: documentIds } },
      include: {
        user: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },

        budgetItem: {
          include: {
            definition: {
              include: {
                project: {
                  select: { name: true }
                }
              }
            }
          }
        }
      },
    });

    const projectName = documentsFromDb[0]?.budgetItem?.definition?.project?.name || 'Proyecto No Especificado';

    // 3. Agrupar documentos por creador (UserId -> DocumentList)
    // Usamos un Map para que si un usuario tiene 3 documentos, se guarden en un solo array
    const creatorMap = new Map<string, { user: any; docs: any[] }>();
    for (const docDb of documentsFromDb) {
      const detail = documentList.find((d) => d.documentId === docDb.id);
      if (!detail) continue;

      if (!creatorMap.has(docDb.userId)) {
        creatorMap.set(docDb.userId, { user: docDb.user, docs: [] });
      }
      const group = creatorMap.get(docDb.userId);
      if (group) group.docs.push(detail);
    }

    // --- TEMPLATE DE CABECERA Y TABLA ---
    const getEmailBody = (userName: string, tableHtml: string) => `
    <div style="font-family: sans-serif; color: #334155;">
      Hola <strong>${userName}</strong>,<br /><br />
      Te informamos que se han procesado pagos correspondientes al proyecto:<br />
      <span style="font-size: 18px; color: #2563eb; font-weight: bold;">🏢 ${projectName}</span>
      <br /><br />
      Los documentos pagados son los siguientes:
      ${tableHtml}
      <div style="margin-top:20px; text-align:center;">
        <a href="${documentUrl}" target="_blank" style="display:inline-block; padding:12px 18px; background-color:#2563eb; color:#ffffff; text-decoration:none; border-radius:6px; font-weight:600;">📎 Ver documentos en plataforma</a>
      </div>
      <br />
      Gracias,<br />
      <strong>Alfa Nevado</strong>
    </div>
  `;

    const generateTable = (list: any[]) => `
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-top: 16px; font-size: 14px;">
      <thead>
        <tr style="background-color:#f1f5f9;">
          <th style="border:1px solid #e2e8f0; padding:8px; text-align:left;">Proveedor</th>
          <th style="border:1px solid #e2e8f0; padding:8px; text-align:left;">Documento</th>
          <th style="border:1px solid #e2e8f0; padding:8px; text-align:left;">Descripción</th>
          <th style="border:1px solid #e2e8f0; padding:8px; text-align:right;">Monto</th>
        </tr>
      </thead>
      <tbody>
        ${list.map(d => `
          <tr>
            <td style="border:1px solid #e2e8f0; padding:8px;">${d.partyName}</td>
            <td style="border:1px solid #e2e8f0; padding:8px;"><strong>${d.documentCode}</strong></td>
            <td style="border:1px solid #e2e8f0; padding:8px;">${d.documentDescription}</td>
            <td style="border:1px solid #e2e8f0; padding:8px; text-align:right;">${d.currencyName} ${d.amount}</td>
          </tr>`).join('')}
      </tbody>
    </table>`;

    // 4. Envío a Administradores
    const adminIds = recipients.map(r => r.user.id);
    const adminTable = generateTable(documentList);

    for (const recipient of recipients) {
      await this.sendCustomEmail(
        recipient.user.email,
        `💰 Pagos Procesados - ${projectName}`,
        'Confirmación de pago',
        getEmailBody(recipient.user.firstName, adminTable)
      );
    }

    // 5. Envío a Creadores (Agrupados)
    for (const [userId, data] of creatorMap) {
      if (adminIds.includes(userId)) continue;

      const userTable = generateTable(data.docs);
      await this.sendCustomEmail(
        data.user.email,
        `💰 Pagos Procesados - ${projectName}`,
        'Confirmación de pago',
        getEmailBody(data.user.firstName, userTable)
      );
    }

    return { totalRecipients: recipients.length, totalCreators: creatorMap.size };
  }

  async notifyExpenseReportPendingAccounting(accountability: {
    id: string;
    code: string;
    approvedAmount: any;
    accountedAmount: any;
    user: {
      firstName: string;
      lastName: string;
    };
    budgetItem: {
      definition: {
        project: {
          name: string;
        };
      };
    };
  }) {
    // 🔹 Receptores (todos)
    const recipients = await this.prisma.zentraNotificationRecipient.findMany({
      where: {
        deletedAt: null,
        notificationCategoryId: NOTIFICATION_CATEGORY.RENDICION_CUENTA
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    if (!recipients.length) {
      return { sent: 0 };
    }

    const userName = `${accountability.user.firstName} ${accountability.user.lastName}`;
    const projectName =
      accountability.budgetItem?.definition?.project?.name ?? '-';

    // 🔹 Tabla HTML
    const expenseReportTable = `
    <table width="100%" cellpadding="0" cellspacing="0"
      style="border-collapse: collapse; margin-top: 16px; font-size: 14px;">
      <tbody>
        <tr>
          <td style="border:1px solid #e2e8f0; padding:8px;"><strong>Usuario</strong></td>
          <td style="border:1px solid #e2e8f0; padding:8px;">${userName}</td>
        </tr>
        <tr>
          <td style="border:1px solid #e2e8f0; padding:8px;"><strong>Código rendición</strong></td>
          <td style="border:1px solid #e2e8f0; padding:8px;">${accountability.code}</td>
        </tr>
        <tr>
          <td style="border:1px solid #e2e8f0; padding:8px;"><strong>Proyecto</strong></td>
          <td style="border:1px solid #e2e8f0; padding:8px;">${projectName}</td>
        </tr>
        <tr>
          <td style="border:1px solid #e2e8f0; padding:8px;"><strong>Monto solicitado</strong></td>
          <td style="border:1px solid #e2e8f0; padding:8px;">
            ${Number(accountability.approvedAmount).toFixed(2)}
          </td>
        </tr>
      </tbody>
    </table>
  `;

    // 🔹 Envío
    for (const recipient of recipients) {
      const fullName = `${recipient.user.firstName} ${recipient.user.lastName}`;

      await this.sendCustomEmail(
        recipient.user.email,
        '🧾 Rendición pendiente de validación contable',
        'Validación contable pendiente',
        `
        Hola ${fullName},<br /><br />

        Se ha completado una <strong>rendición de cuentas</strong> y se encuentra
        en estado de <strong>Validación Contable Pendiente</strong>.<br /><br />

        ${expenseReportTable}

        <br />
        Por favor, ingresa al sistema para realizar la validación correspondiente.<br /><br />

        Gracias,<br />
        <strong>Alfa Nevado</strong>
      `,
      );
    }

    return { sent: recipients.length };
  }

  async notifyRefundRequested(accountability: {
    id: string;
    code: string;
    approvedAmount: any;
    accountedAmount: any;
    user: {
      firstName: string;
      lastName: string;
    };
    budgetItem: {
      definition: {
        project: {
          name: string;
        };
      };
    };
  }, amountToPay, currencyId) {


    let currencyLabel = '';

    if (currencyId === CURRENCY.SOLES) {
      currencyLabel = 'S/.';
    }

    if (currencyId === CURRENCY.DOLARES) {
      currencyLabel = '$';
    }

    const recipients = await this.prisma.zentraNotificationRecipient.findMany({
      where: {
        deletedAt: null,
        notificationCategoryId: NOTIFICATION_CATEGORY.RENDICION_CUENTA
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    if (!recipients.length) {
      return { sent: 0 };
    }

    const userName = `${accountability.user.firstName} ${accountability.user.lastName}`;
    const projectName =
      accountability.budgetItem?.definition?.project?.name ?? '-';

    // 🔹 Tabla HTML
    const expenseReportTable = `
    <table width="100%" cellpadding="0" cellspacing="0"
      style="border-collapse: collapse; margin-top: 16px; font-size: 14px;">
      <tbody>
        <tr>
          <td style="border:1px solid #e2e8f0; padding:8px;"><strong>Usuario</strong></td>
          <td style="border:1px solid #e2e8f0; padding:8px;">${userName}</td>
        </tr>
        <tr>
          <td style="border:1px solid #e2e8f0; padding:8px;"><strong>Código de rendición</strong></td>
          <td style="border:1px solid #e2e8f0; padding:8px;">${accountability.code}</td>
        </tr>
        <tr>
          <td style="border:1px solid #e2e8f0; padding:8px;"><strong>Proyecto</strong></td>
          <td style="border:1px solid #e2e8f0; padding:8px;">${projectName}</td>
        </tr>
        <tr>
          <td style="border:1px solid #e2e8f0; padding:8px;">
            <strong>Monto de reembolso solicitado</strong>
          </td>
          <td style="border:1px solid #e2e8f0; padding:8px;">
            ${currencyLabel} ${Number(amountToPay).toFixed(2)}
          </td>
        </tr>
      </tbody>
    </table>
  `;

    // 🔹 Envío de correos
    for (const recipient of recipients) {
      const fullName = `${recipient.user.firstName} ${recipient.user.lastName}`;

      await this.sendCustomEmail(
        recipient.user.email,
        '💰 Solicitud de reembolso creada',
        'Solicitud de reembolso',
        `
        Hola ${fullName},<br /><br />

        Se ha creado una <strong>solicitud de reembolso</strong> asociada a la siguiente
        <strong>rendición de cuenta</strong>:<br /><br />

        ${expenseReportTable}

        <br />
        La solicitud ha sido registrada para su posterior revisión y procesamiento.<br /><br />

        Gracias,<br />
        <strong>Alfa Nevado</strong>
      `,
      );
    }

    return { sent: recipients.length };
  }

  async notifyBudgetDocument(dto: { documentId: string }) {

    const doc = await this.prisma.zentraDocument.findUnique({
      where: { id: dto.documentId },
      include: {
        currency: true,
        party: true,
        user: true,
        documentType: true,
        budgetItem: {
          include: {
            definition: {
              include: {
                project: true
              }
            },
            currency: true
          }
        }
      },
    });

    if (!doc) throw new Error('Documento no encontrado');

    const projectName = doc.budgetItem?.definition?.project?.name || 'Proyecto no definido';
    const definitionName = doc.budgetItem?.definition?.name || 'Partida no definida';

    const recipients = await this.prisma.zentraNotificationRecipient.findMany({
      where: {
        deletedAt: null,
        notificationCategoryId: NOTIFICATION_CATEGORY.PRESUPUESTO
      },
      include: {
        user: true,
      },
    });

    // 3. Template del Email (Actualizado con la alerta de exceso)
    const getEmailBody = (userName: string) => {
      // Aseguramos 2 decimales para los montos
      const montoDocumento = Number(doc.totalAmount).toFixed(2);
      const montoPresupuesto = Number(doc.budgetItem.amount).toFixed(2);

      return `
    <div style="font-family: sans-serif; color: #334155; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #ef4444; color: white; padding: 18px; text-align: center;">
        <h2 style="margin: 0; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">⚠️ Alerta: Presupuesto Excedido</h2>
      </div>
      
      <div style="padding: 24px;">
        Hola <strong>${userName}</strong>,<br /><br />
        Se ha registrado un documento que supera el presupuesto asignado para la siguiente partida:
        <br /><br />
        
        <table width="100%" style="border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;">Proyecto</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; text-align: right; font-weight: bold;">${projectName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;">Partida</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; text-align: right; font-weight: bold; color: #2563eb;">${definitionName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;">Presupuesto de Partida</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; text-align: right; font-weight: bold;">${doc.budgetItem.currency.name} ${montoPresupuesto}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b;">Monto del Documento</td>
            <td style="padding: 8px 0; text-align: right; font-weight: bold; color: #ef4444; font-size: 16px;">${doc.currency.name} ${montoDocumento}</td>
          </tr>
        </table>

        <div style="margin-top: 24px; padding: 16px; background-color: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0;">
          <strong style="font-size: 13px; color: #475569;">DETALLES DEL REGISTRO:</strong><br />
          <p style="margin: 8px 0 0 0; font-size: 14px;">
            <strong>Fecha:</strong> ${moment(doc.documentDate).format('DD/MM/YYYY')}<br />
            <strong>Tipo:</strong> ${doc.documentType.name} ${doc.code}<br />
            <strong>Proveedor:</strong> ${doc.party.name}<br />
            <strong>Registrado por:</strong> ${doc.user.firstName} ${doc.user.lastName}<br />
            <strong>Descripción:</strong> ${doc.description || 'Sin descripción'}
          </p>
        </div>

        <p style="margin-top: 25px; font-size: 12px; color: #94a3b8; text-align: center; border-top: 1px solid #f1f5f9; padding-top: 15px;">
          Este es un mensaje automático del <strong>Sistema de Control - Alfa Nevado</strong>
        </p>
      </div>
    </div>
  `;
    };

    for (const recipient of recipients) {
      await this.sendCustomEmail(
        recipient.user.email,
        `EXCESO DE PRESUPUESTO - ${projectName} ${definitionName}`,
        'Presupuesto',
        getEmailBody(recipient.user.firstName)
      );
    }

    return {
      success: true,
      recipientsNotified: recipients.length,
      partida: definitionName
    };
  }




}