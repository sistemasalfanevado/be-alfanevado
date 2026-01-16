import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Put,
  Delete,
} from '@nestjs/common';

import { ZentraPettyCashService } from './zentra-petty-cash.service';
import { CreateZentraPettyCashDto } from './dto/create-zentra-petty-cash.dto';
import { UpdateZentraPettyCashDto } from './dto/update-zentra-petty-cash.dto';

@Controller('zentra-petty-cash')
export class ZentraPettyCashController {
  constructor(
    private readonly zentraPettyCashService: ZentraPettyCashService,
  ) { }


  @Post('add-document')
  addDocument(@Body() dataDocument: any) {
    return this.zentraPettyCashService.addDocument(dataDocument);
  }

  @Post()
  async create(
    @Body() CreateZentraPettyCashDto: any
  ) {
    return this.zentraPettyCashService.create(CreateZentraPettyCashDto);
  }

  @Post('search')
  search(@Body() filters: {
    pettyCashStatusId?: string;
    partyId?: string;
    companyId?: string;
    startDate?: string;
    endDate?: string;
    userId?: string;
    deletedAt?: boolean;
  }) {
    return this.zentraPettyCashService.findByFilters(filters);
  }


  @Put('update-document/:id')
  async updateDocument(
    @Param('id') id: string,
    @Body() updateZentraPettyCashDto: any
  ) {
    return this.zentraPettyCashService.updateDocument(id, updateZentraPettyCashDto);
  }

  @Put('update-simple-document/:id')
  async updateSimpleDocument(
    @Param('id') id: string,
    @Body() updateZentraPettyCashDto: any
  ) {
    return this.zentraPettyCashService.updateSimpleDocument(id, updateZentraPettyCashDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraPettyCashService.remove(id);
  }

  @Delete('remove-document/:id')
  removeDocument(
    @Param('id') id: string,
  ) {
    return this.zentraPettyCashService.removeDocument(id);
  }

  @Post('add-increment')
  addIncrement(@Body() dataAccountability: any) {
    return this.zentraPettyCashService.addIncrement(dataAccountability);
  }

  
  @Post('process-expense-document')
  async processExpenseDocument(
    @Body() data: { pettyCashId: string; documentIds: string[] }
  ) {
    return this.zentraPettyCashService.processExpenseDocument(
      data.pettyCashId,
      data.documentIds
    );
  }


}