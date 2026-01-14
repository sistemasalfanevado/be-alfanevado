import {
  Controller, Get, Post, Body, Param, Patch, Put, Delete
} from '@nestjs/common';
import { ZentraAccountabilityService } from './zentra-accountability.service';
import { CreateZentraAccountabilityDto } from './dto/create-zentra-accountability.dto';
import { UpdateZentraAccountabilityDto } from './dto/update-zentra-accountability.dto';

@Controller('zentra-accountabilities')
export class ZentraAccountabilityController {
  constructor(
    private readonly zentraAccountabilityService: ZentraAccountabilityService
  ) { }

  @Post()
  async create(
    @Body() createZentraAccountabilityDto: any
  ) {
    return this.zentraAccountabilityService.create(createZentraAccountabilityDto);
  }

  @Get()
  findAll() {
    return this.zentraAccountabilityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraAccountabilityService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateZentraAccountabilityDto: UpdateZentraAccountabilityDto
  ) {
    await this.zentraAccountabilityService.update(id, updateZentraAccountabilityDto);
    return { message: 'Accountability actualizada exitosamente' };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraAccountabilityService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraAccountabilityService.restore(id);
  }

  @Post('search')
  search(@Body() filters: {
    accountabilityStatusId?: string;
    partyId?: string;
    startDate?: string;
    endDate?: string;
    userId?: string;
    deletedAt?: boolean;
  }) {
    return this.zentraAccountabilityService.findByFilters(filters);
  }


  @Post('add-increment')
  addIncrement(@Body() dataAccountability: any) {
    return this.zentraAccountabilityService.addIncrement(dataAccountability);
  }

  @Post('add-refund')
  addRefund(@Body() dataAccountability: any) {
    return this.zentraAccountabilityService.addRefund(dataAccountability);
  }

  
  @Post('add-document')
  addDocument(@Body() dataAccountability: any) {
    return this.zentraAccountabilityService.addDocument(dataAccountability);
  }

  @Put('update-document/:id')
  async updateDocument(
    @Param('id') id: string,
    @Body() updateZentraAccountabilityDto: any
  ) {
    return this.zentraAccountabilityService.updateDocument(id, updateZentraAccountabilityDto);
  }

  @Put('update-simple-document/:id')
  async updateSimpleDocument(
    @Param('id') id: string,
    @Body() updateZentraAccountabilityDto: any
  ) {
    return this.zentraAccountabilityService.updateSimpleDocument(id, updateZentraAccountabilityDto);
  }

  @Delete('remove-document/:id')
  removeDocument(
    @Param('id') id: string,
  ) {
    return this.zentraAccountabilityService.removeDocument(id);
  }


  // Devoluviones
  @Post('add-document-return')
  addDocumentReturn(@Body() dataAccountability: any) {
    return this.zentraAccountabilityService.addDocumentReturn(dataAccountability);
  }

  // Reportes

  @Post('get-data-report')
  getAllDataReport(@Body('id') accountabilityId: string) {
    return this.zentraAccountabilityService.getAllDataReport(accountabilityId);
  }



}