import { Controller, Get, Post, Body, Param, Patch, Put, Delete, UseGuards } from '@nestjs/common';
import { ZentraMovementService } from './zentra-movement.service';
import { CreateZentraMovementDto } from './dto/create-zentra-movement.dto';
import { UpdateZentraMovementDto } from './dto/update-zentra-movement.dto';

@Controller('zentra-movements')
export class ZentraMovementController {
  constructor(private readonly zentraMovementService: ZentraMovementService) { }

  @Post()
  create(@Body() createDto: CreateZentraMovementDto) {
    return this.zentraMovementService.create(createDto);
  }

  @Get()
  findAll() {
    return this.zentraMovementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraMovementService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateZentraMovementDto) {
    return this.zentraMovementService.update(id, updateDto);
  }

  @Put('simple/:id')
  updateSimple(
    @Param('id') id: string,
    @Body() updateDto: any
  ) {
    return this.zentraMovementService.updateSimple(id, updateDto);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraMovementService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraMovementService.restore(id);
  }

  // 1. Movimientos por BudgetItemId
  @Get('by-budget-item/:budgetItemId')
  findByBudgetItem(@Param('budgetItemId') budgetItemId: string) {
    return this.zentraMovementService.findByBudgetItem(budgetItemId);
  }

  // 2. Movimientos por CurrencyId
  @Get('by-currency/:currencyId')
  findByCurrency(@Param('currencyId') currencyId: string) {
    return this.zentraMovementService.findByCurrency(currencyId);
  }

  // 3. Movimientos por BudgetItemId y CurrencyId
  @Get('by-budget-item/:budgetItemId/currency/:currencyId')
  findByBudgetItemAndCurrency(
    @Param('budgetItemId') budgetItemId: string,
    @Param('currencyId') currencyId: string,
  ) {
    return this.zentraMovementService.findByBudgetItemAndCurrency(budgetItemId, currencyId);
  }

  // 2. Movimientos por InstallmentId
  @Get('by-installment/:installmentId')
  findByInstallment(@Param('installmentId') installmentId: string) {
    return this.zentraMovementService.findByInstallment(installmentId);
  }

  @Get('by-document/:documentId')
  findByDocument(@Param('documentId') documentId: string) {
    return this.zentraMovementService.findByDocument(documentId);
  }

  @Post('search')
  search(@Body() filters: {
    companyId?: string;
    projectId?: string;
    partyId?: string;
    bankAccountId?: string;
    startDate?: string;
    endDate?: string;
    budgetItemId?: string;
  }) {
    return this.zentraMovementService.findByFilters(filters);
  }

  @Post('search-all-budget-item')
  searchAllBudgetIten(@Body() filters: {
    startDate?: string;
    endDate?: string;
    budgetItemId?: string;
    projectId?: string;
  }) {
    return this.zentraMovementService.findByFiltersAllBudgetItem(filters);
  }

  @Get('profitability/yearly/:projectId')
  async getYearlyProfitability(@Param('projectId') projectId: string) {
    return this.zentraMovementService.getYearlyProfitability(projectId);
  }

  @Post('profitability/monthly')
  async getMonthlyProfitability(
    @Body() body: { projectId: string; month: number; year: number }
  ) {
    return this.zentraMovementService.getMonthlyProfitability( 
      body.projectId,
      body.month,
      body.year
    );
  }

  @Get('project/:projectId')
  findAllByProject(@Param('projectId') projectId: string) {
    return this.zentraMovementService.findAllByProject(projectId);
  }

  @Get('company/:companyId')
  findAllByCompany(@Param('companyId') companyId: string) {
    return this.zentraMovementService.findAllByCompany(companyId);
  }


  @Get('bankStatement/:bankAccountId')
  findAllByBankStatement(@Param('bankAccountId') bankAccountId: string) {
    return this.zentraMovementService.findAllByBankStatement(bankAccountId);
  }



  @Post('recalculateBudgetItems')
  recalculateBudgetItems(@Body() body: {
    companyId: string;
    preview: boolean;
  }) {
    return this.zentraMovementService.recalculateBudgetItems(
      body.companyId,
      body.preview
    );
  }

  @Post('recalculateBankAccount')
  recalculateBankAccount(@Body() body: {
    companyId: string;
    preview: boolean;
  }) {
    return this.zentraMovementService.recalculateBankAccount(
      body.companyId,
      body.preview
    );
  }


  @Post('search-budget-item')
  searchByBudgetItem(@Body() filters: {
    startDate?: string;
    endDate?: string;
    budgetItemIds: string[];
  }) {
    return this.zentraMovementService.findByBudgetItems(filters);
  }

  @Post('recalculate-exchange-rates')
  async recalculateExchangeRates(@Body() body: {
    startDate: string; // Formato DD/MM/YYYY
    endDate: string;   // Formato DD/MM/YYYY
  }) {
    return this.zentraMovementService.recalculateExchangeRatesByRange(
      body.startDate,
      body.endDate
    );
  }

}