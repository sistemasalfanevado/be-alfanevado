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
  ) {}

  @Post()
  create(@Body() dto: CreateZentraPettyCashDto) {
    return this.zentraPettyCashService.create(dto);
  }

  @Get()
  findAll() {
    return this.zentraPettyCashService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraPettyCashService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateZentraPettyCashDto,
  ) {
    await this.zentraPettyCashService.update(id, dto);
    return { message: 'Petty Cash actualizada exitosamente' };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraPettyCashService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraPettyCashService.restore(id);
  }

  @Post('search')
  search(
    @Body()
    filters: {
      pettyCashStatusId?: string;
      partyId?: string;
      startDate?: string;
      endDate?: string;
      userId?: string;
      deletedAt?: boolean;
    },
  ) {
    return this.zentraPettyCashService.findByFilters(filters);
  }

  @Post('add-increment')
  addIncrement(
    @Body() data: { pettyCashId: string; amount: number },
  ) {
    return this.zentraPettyCashService.addIncrement(data);
  }

  @Post('add-refund')
  addRefund(
    @Body() data: { pettyCashId: string; amount: number },
  ) {
    return this.zentraPettyCashService.addRefund(data);
  }


  @Delete('remove-document/:id')
  removeDocument(@Param('id') id: string) {
    return this.zentraPettyCashService.removeDocument(id);
  }

  @Post('get-data-report')
  getAllDataReport(@Body('id') pettyCashId: string) {
    return this.zentraPettyCashService.getAllDataReport(pettyCashId);
  }





  // Useful Methods


  @Post('add-document')
  addDocument(@Body() dataDocument: any) {
    return this.zentraPettyCashService.addDocument(dataDocument);
  }






}