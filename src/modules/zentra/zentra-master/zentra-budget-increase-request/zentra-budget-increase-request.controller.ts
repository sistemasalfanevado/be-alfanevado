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
import { ZentraBudgetIncreaseRequestService } from './zentra-budget-increase-request.service';
import { CreateZentraBudgetIncreaseRequestDto } from './dto/create-zentra-budget-increase-request.dto';
import { UpdateZentraBudgetIncreaseRequestDto } from './dto/update-zentra-budget-increase-request.dto';

import { JwtAuthGuard } from '../../../../auth/shared/guards/jwt-auth.guard';
import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-budget-increase-requests')
// @UseGuards(JwtAuthGuard)
export class ZentraBudgetIncreaseRequestController {
  constructor(
    private readonly zentraBudgetIncreaseRequestService: ZentraBudgetIncreaseRequestService,
  ) {}

  @Post()
  create(@Body() createDto: CreateZentraBudgetIncreaseRequestDto) {
    return this.zentraBudgetIncreaseRequestService.create(createDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.zentraBudgetIncreaseRequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraBudgetIncreaseRequestService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateZentraBudgetIncreaseRequestDto,
  ) {
    return this.zentraBudgetIncreaseRequestService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraBudgetIncreaseRequestService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraBudgetIncreaseRequestService.restore(id);
  }
}