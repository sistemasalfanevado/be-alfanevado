import { 
  Controller, Get, Post, Body, Param, Patch, Put, Delete, UseGuards 
} from '@nestjs/common';
import { ZentraScheduledDebtDocumentService } from './zentra-scheduled-debt-document.service';
import { CreateZentraScheduledDebtDocumentDto } from './dto/create-zentra-scheduled-debt-document.dto';
import { UpdateZentraScheduledDebtDocumentDto } from './dto/update-zentra-scheduled-debt-document.dto';

@Controller('zentra-scheduled-debt-documents')
export class ZentraScheduledDebtDocumentController {
  constructor(
    private readonly scheduledDebtDocumentService: ZentraScheduledDebtDocumentService,
  ) {}

  @Post()
  create(
    @Body() createDto: CreateZentraScheduledDebtDocumentDto,
  ) {
    return this.scheduledDebtDocumentService.create(createDto);
  }

  @Get()
  findAll() {
    return this.scheduledDebtDocumentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scheduledDebtDocumentService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateZentraScheduledDebtDocumentDto,
  ) {
    return this.scheduledDebtDocumentService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scheduledDebtDocumentService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.scheduledDebtDocumentService.restore(id);
  }
}