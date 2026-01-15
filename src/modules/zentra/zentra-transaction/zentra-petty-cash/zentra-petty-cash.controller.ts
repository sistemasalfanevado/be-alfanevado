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

  /*
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

  */




  // Useful Methods


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

}