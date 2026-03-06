import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';

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

  @Post('notify-budget')
  notifyBudgetDocument(
    @Body()
    dto: {
      documentId: string;
    },
  ) {
    return this.mailService.notifyBudgetDocument(dto);
  }


}