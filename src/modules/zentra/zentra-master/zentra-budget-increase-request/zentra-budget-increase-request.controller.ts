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

@Controller('zentra-budget-increase-requests')
export class ZentraBudgetIncreaseRequestController {
  constructor(
    private readonly zentraBudgetIncreaseRequestService: ZentraBudgetIncreaseRequestService,
  ) {}

  @Post()
  create(@Body() createDto: CreateZentraBudgetIncreaseRequestDto) {
    return this.zentraBudgetIncreaseRequestService.create(createDto);
  }

  @Get()
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