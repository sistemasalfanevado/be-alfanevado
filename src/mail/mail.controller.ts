import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';
import { SendTestMailDto } from './dto/send-test-mail.dto';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) { }

  
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