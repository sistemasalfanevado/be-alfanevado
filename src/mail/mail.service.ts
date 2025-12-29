import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { defaultTemplate } from './templates/default.template';
import { PrismaService } from '../prisma/prisma.service';
import { CURRENCY } from 'src/shared/constants/app.constants';


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
    if (!documentList.length) {
      return { sent: 0 };
    }

    // 🔹 URL única (se repite siempre)
    const documentUrl = documentList[0].documentUrl;

    // 🔹 Receptores activos
    const recipients = await this.prisma.zentraNotificationRecipient.findMany({
      where: {
        deletedAt: null,
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

    // 🔹 Tabla HTML
    const documentsTable = `
    <table width="100%" cellpadding="0" cellspacing="0"
      style="border-collapse: collapse; margin-top: 16px; font-size: 14px;">
      <thead>
        <tr style="background-color:#f1f5f9;">
          <th style="border:1px solid #e2e8f0; padding:8px; text-align:left;">Proveedor</th>
          <th style="border:1px solid #e2e8f0; padding:8px; text-align:left;">Documento</th>
          <th style="border:1px solid #e2e8f0; padding:8px; text-align:left;">Descripción</th>
          <th style="border:1px solid #e2e8f0; padding:8px; text-align:left;">Moneda</th>
          <th style="border:1px solid #e2e8f0; padding:8px; text-align:right;">Monto</th>
        </tr>
      </thead>
      <tbody>
        ${documentList
        .map(
          d => `
            <tr>
              <td style="border:1px solid #e2e8f0; padding:8px;">${d.partyName}</td>
              <td style="border:1px solid #e2e8f0; padding:8px;"><strong>${d.documentCode}</strong></td>
              <td style="border:1px solid #e2e8f0; padding:8px;">${d.documentDescription}</td>
              <td style="border:1px solid #e2e8f0; padding:8px;">${d.currencyName}</td>
              <td style="border:1px solid #e2e8f0; padding:8px; text-align:right;">${d.amount}</td>
            </tr>
          `,
        )
        .join('')}
      </tbody>
    </table>
  `;

    // 🔹 Botón link único
    const documentLinkHtml = `
    <div style="margin-top:20px; text-align:center;">
      <a href="${documentUrl}" target="_blank"
        style="
          display:inline-block;
          padding:12px 18px;
          background-color:#2563eb;
          color:#ffffff;
          text-decoration:none;
          border-radius:6px;
          font-weight:600;
        ">
        📎 Ver documento
      </a>
    </div>
  `;

    // 🔹 Envío de correos
    for (const recipient of recipients) {
      const fullName = `${recipient.user.firstName} ${recipient.user.lastName}`;

      await this.sendCustomEmail(
        recipient.user.email,
        '💰 Documentos pagados',
        'Pago confirmado',
        `
        Hola ${fullName},<br /><br />

        Te informamos que los siguientes documentos ya fueron pagados mediante
        <strong>Telecrédito</strong>:<br />

        ${documentsTable}

        ${documentLinkHtml}

        <br /><br />
        Gracias,<br />
        <strong>Alfa Nevado</strong>
      `,
      );
    }

    return {
      totalRecipients: recipients.length,
      totalDocuments: documentList.length,
    };
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
        <strong>rendición de cuentas</strong>:<br /><br />

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





}