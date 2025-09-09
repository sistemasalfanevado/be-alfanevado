import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Patch, 
  Put, 
  Delete, 
  UseGuards 
} from '@nestjs/common';
import { ZentraBudgetIncreaseStatusService } from './zentra-budget-increase-status.service';
import { CreateZentraBudgetIncreaseStatusDto } from './dto/create-zentra-budget-increase-status.dto';
import { UpdateZentraBudgetIncreaseStatusDto } from './dto/update-zentra-budget-increase-status.dto';

import { JwtAuthGuard } from '../../../../auth/shared/guards/jwt-auth.guard';
import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-budget-increase-statuses')
// @UseGuards(JwtAuthGuard)
export class ZentraBudgetIncreaseStatusController {
  constructor(
    private readonly zentraBudgetIncreaseStatusService: ZentraBudgetIncreaseStatusService,
  ) {}

  @Post()
  create(@Body() createDto: CreateZentraBudgetIncreaseStatusDto) {
    return this.zentraBudgetIncreaseStatusService.create(createDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.zentraBudgetIncreaseStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraBudgetIncreaseStatusService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateZentraBudgetIncreaseStatusDto,
  ) {
    return this.zentraBudgetIncreaseStatusService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraBudgetIncreaseStatusService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraBudgetIncreaseStatusService.restore(id);
  }
}