import { Controller, Get, Post, Body, Param, Patch, Put, Delete, UseGuards } from '@nestjs/common';
import { ZentraDocumentService } from './zentra-document.service';
import { CreateZentraDocumentDto } from './dto/create-zentra-document.dto';
import { UpdateZentraDocumentDto } from './dto/update-zentra-document.dto';
import { JwtAuthGuard } from '../../../../auth/shared/guards/jwt-auth.guard';
import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-documents')
//@UseGuards(JwtAuthGuard)
export class ZentraDocumentController {
  constructor(private readonly zentraDocumentService: ZentraDocumentService) { }

  @Post()
  create(@Body() createZentraDocumentDto: CreateZentraDocumentDto) {
    return this.zentraDocumentService.create(createZentraDocumentDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.zentraDocumentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraDocumentService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateZentraDocumentDto: UpdateZentraDocumentDto) {
    return this.zentraDocumentService.update(id, updateZentraDocumentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraDocumentService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraDocumentService.restore(id);
  }

  @Post('search')
  @Public()
  search(@Body() filters: {
    documentStatusId?: string;
    partyId?: string;
    documentCategoryId?: string;
    startDate?: string;
    endDate?: string;
  }) {
    return this.zentraDocumentService.findByFilters(filters);
  }

  @Post('exchange-rate')
  createExchangeRate(@Body() createZentraDocumentDto: any) {
    return this.zentraDocumentService.createExchangeRate(createZentraDocumentDto);
  }
  
  @Delete('exchange-rate/:id')
  removeExchangeRate(@Param('id') id: string) {
    return this.zentraDocumentService.removeExchangeRate(id);
  }

  @Post('exchange-rate/search')
  @Public()
  searchExchangeRate(@Body() filters: {
    partyId?: string;
    documentCategoryId?: string;
    startDate?: string;
    endDate?: string;
  }) {
    return this.zentraDocumentService.findByFiltersExchangeRate(filters);
  }




}