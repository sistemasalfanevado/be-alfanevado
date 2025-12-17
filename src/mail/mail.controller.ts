import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';
import { SendTestMailDto } from './dto/send-test-mail.dto';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) { }

  // 🔹 correo de prueba (ya funciona)
  @Post('test')
  sendTestMail(@Body() dto: SendTestMailDto) {
    return this.mailService.sendCustomEmail(
      dto.to,
      dto.subject ?? '✅ Prueba de notificación',
      dto.title ?? 'Notificación de prueba',
      dto.message ??
      'Este correo confirma que el servicio de correos funciona correctamente.',
    );
  }

  // 🔹 NUEVO: notificar documentos pagados
  // mail.controller.ts
  @Post('notify-paid')
  notifyPaidDocuments(
    @Body()
    dto: {
      documents: {
        documentId: string;
        partyName: string;
        documentCode: string;
        documentDescription: string;
        currencyName: string;
        amount: string;
        documentUrl: string;
      }[];
    },
  ) {
    return this.mailService.notifyDocumentsPaid(dto.documents);
  }
}