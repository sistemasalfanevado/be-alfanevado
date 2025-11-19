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
  async create(@Body() createZentraDocumentDto: CreateZentraDocumentDto) {
    await this.zentraDocumentService.create(createZentraDocumentDto);
    return { message: 'Documento creado exitosamente' };
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
  async update(@Param('id') id: string, @Body() updateZentraDocumentDto: UpdateZentraDocumentDto) {
    await this.zentraDocumentService.update(id, updateZentraDocumentDto);
    return { message: 'Documento actualizado exitosamente' };
  }

  @Put('simple/:id')
  updateSimple(
    @Param('id') id: string,
    @Body() updateDto: any
  ) {
    return this.zentraDocumentService.updateSimple(id, updateDto);
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
    transactionTypeId?: string,
    documentStatusId?: string;
    partyId?: string;
    documentCategoryId?: string;
    financialNatureId?: string;
    projectId?: string;
    companyId?: string;
    userId?: string;
    startDate?: string;
    endDate?: string;
    withPartyBankAccount?: boolean;
    accountabilityId?: string;
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
    projectId?: string;
  }) {
    return this.zentraDocumentService.findByFiltersExchangeRate(filters);
  }

  @Put('exchange-rate/:id')
  updateExchangeRate(@Param('id') id: string, @Body() updateZentraDocumentDto: any) {
    return this.zentraDocumentService.updateExchangeRate(id, updateZentraDocumentDto);
  }


  // Financial Expense

  @Post('financial-expense')
  createFinancialExpense(@Body() createZentraDocumentDto: any) {
    return this.zentraDocumentService.createFinancialExpense(createZentraDocumentDto);
  }

  @Delete('financial-expense/:id')
  removeFinancialExpense(@Param('id') id: string) {
    return this.zentraDocumentService.removeFinancialExpense(id);
  }

  @Post('financial-expense/search')
  @Public()
  searchFinancialExpense(@Body() filters: {
    projectId?: string;
    documentCategoryId?: string;
    startDate?: string;
    endDate?: string;
  }) {
    return this.zentraDocumentService.findByFiltersFinancialExpense(filters);
  }

  @Put('financial-expense/:id')
  updateFinancialExpense(@Param('id') id: string, @Body() updateZentraDocumentDto: any) {
    return this.zentraDocumentService.updateFinancialExpense(id, updateZentraDocumentDto);
  }

  // Scheduled Document Income
  @Post('scheduled-income')
  createScheduledIncome(@Body() createZentraDocumentDto: any) {
    return this.zentraDocumentService.createScheduledIncome(createZentraDocumentDto);
  }

  @Post('scheduled-income/search') 
  @Public()
  searchScheduledIncome(@Body() filters: {
    documentCategoryId?: string;
    documentStatusId?: string;
    partyId?: string;
    startDate?: string;
    endDate?: string;
    projectId?: string;
    companyId?: string;
  }) { 
    return this.zentraDocumentService.findByFiltersScheduledIncome(filters);
  }

  @Put('scheduled-income/:id')
  updateScheduledIncome(@Param('id') id: string, @Body() updateZentraDocumentDto: any) {
    return this.zentraDocumentService.updateScheduledIncome(id, updateZentraDocumentDto);
  }

  @Delete('scheduled-income/:id')
  removeScheduledIncome(@Param('id') id: string) {
    return this.zentraDocumentService.removeScheduledIncome(id);
  }
  
  @Delete('scheduled-document/:id')
  removeScheduledDocument(@Param('id') id: string) {
    return this.zentraDocumentService.removeScheduledDocument(id);
  }
  
  @Post('scheduled-income/report')
  @Public()
  searchScheduledIncomeReport(@Body() filters: {
    projectId: string;
    documentCategoryId: string;
  }) {
    return this.zentraDocumentService.findByFiltersScheduledIncomeReport(filters);
  }

  @Post('scheduled-income/ia')
  @Public()
  searchScheduledIncomeReportIa(@Body() filters: {
    projectId: string;
    documentCategoryId: string;
  }) {
    return this.zentraDocumentService.findByFiltersScheduledIncomeReportIa(filters);
  }


  // Scheduled Document Debt
  @Post('scheduled-debt')
  createDebtIncome(@Body() createZentraDocumentDto: any) {
    return this.zentraDocumentService.createScheduledDebt(createZentraDocumentDto);
  }

  @Post('scheduled-debt/search') 
  @Public()
  searchScheduledDebt(@Body() filters: {
    documentCategoryId?: string;
    documentStatusId?: string;
    partyId?: string;
    startDate?: string;
    endDate?: string;
    projectId?: string;
    companyId?: string;
  }) { 
    return this.zentraDocumentService.findByFiltersScheduledDebt(filters);
  }

  @Put('scheduled-debt/:id')
  updateScheduledDebt(@Param('id') id: string, @Body() updateZentraDocumentDto: any) {
    return this.zentraDocumentService.updateScheduledDebt(id, updateZentraDocumentDto);
  }

  @Delete('scheduled-debt/:id')
  removeScheduledDebt(@Param('id') id: string) {
    return this.zentraDocumentService.removeScheduledDebt(id);
  }
  

}