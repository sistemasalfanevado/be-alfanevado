import { 
  Controller, Get, Post, Body, Param, Patch, Put, Delete, UseGuards 
} from '@nestjs/common';
import { ZentraScheduledIncomeDocumentService } from './zentra-scheduled-income-document.service';
import { CreateZentraScheduledIncomeDocumentDto } from './dto/create-zentra-scheduled-income-document.dto';
import { UpdateZentraScheduledIncomeDocumentDto } from './dto/update-zentra-scheduled-income-document.dto';

@Controller('zentra-scheduled-income-documents')
export class ZentraScheduledIncomeDocumentController {
  constructor(
    private readonly scheduledIncomeDocumentService: ZentraScheduledIncomeDocumentService,
  ) {}

  @Post()
  create(
    @Body() createDto: CreateZentraScheduledIncomeDocumentDto,
  ) {
    return this.scheduledIncomeDocumentService.create(createDto);
  }

  @Get()
  findAll() {
    return this.scheduledIncomeDocumentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scheduledIncomeDocumentService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateZentraScheduledIncomeDocumentDto,
  ) {
    return this.scheduledIncomeDocumentService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scheduledIncomeDocumentService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.scheduledIncomeDocumentService.restore(id);
  }
}