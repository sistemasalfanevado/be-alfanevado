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
import { ZentraDocumentBudgetStatusService } from './zentra-document-budget-status.service';
import { CreateZentraDocumentBudgetStatusDto } from './dto/create-zentra-document-budget-status.dto';
import { UpdateZentraDocumentBudgetStatusDto } from './dto/update-zentra-document-budget-status.dto';

@Controller('zentra-document-budget-status')
export class ZentraDocumentBudgetStatusController {
  constructor(
    private readonly zentraDocumentBudgetStatusService: ZentraDocumentBudgetStatusService,
  ) {}

  @Post()
  create(@Body() createDto: CreateZentraDocumentBudgetStatusDto) {
    return this.zentraDocumentBudgetStatusService.create(createDto);
  }

  @Get()
  findAll() {
    return this.zentraDocumentBudgetStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraDocumentBudgetStatusService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateZentraDocumentBudgetStatusDto,
  ) {
    return this.zentraDocumentBudgetStatusService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraDocumentBudgetStatusService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraDocumentBudgetStatusService.restore(id);
  }
}