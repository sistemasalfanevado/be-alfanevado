import { Controller, Get, Post, Body, Param, Patch, Put, Delete, UseGuards } from '@nestjs/common';
import { ZentraMovementService } from './zentra-movement.service';
import { CreateZentraMovementDto } from './dto/create-zentra-movement.dto';
import { UpdateZentraMovementDto } from './dto/update-zentra-movement.dto';
import { JwtAuthGuard } from '../../../../auth/shared/guards/jwt-auth.guard';
import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-movements')
//@UseGuards(JwtAuthGuard)
export class ZentraMovementController {
  constructor(private readonly zentraMovementService: ZentraMovementService) { }

  @Post()
  create(@Body() createDto: CreateZentraMovementDto) {
    return this.zentraMovementService.create(createDto);
  }

  @Get()
  @Public()
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
  @Public()
  findByBudgetItem(@Param('budgetItemId') budgetItemId: string) {
    return this.zentraMovementService.findByBudgetItem(budgetItemId);
  }

  // 2. Movimientos por CurrencyId
  @Get('by-currency/:currencyId')
  @Public()
  findByCurrency(@Param('currencyId') currencyId: string) {
    return this.zentraMovementService.findByCurrency(currencyId);
  }

  // 3. Movimientos por BudgetItemId y CurrencyId
  @Get('by-budget-item/:budgetItemId/currency/:currencyId')
  @Public()
  findByBudgetItemAndCurrency(
    @Param('budgetItemId') budgetItemId: string,
    @Param('currencyId') currencyId: string,
  ) {
    return this.zentraMovementService.findByBudgetItemAndCurrency(budgetItemId, currencyId);
  }

  // 2. Movimientos por InstallmentId
  @Get('by-installment/:installmentId')
  @Public()
  findByInstallment(@Param('installmentId') installmentId: string) {
    return this.zentraMovementService.findByInstallment(installmentId);
  }

}