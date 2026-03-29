import { Controller, Get, Post, Body, Param, Patch, Put, Delete } from '@nestjs/common';
import { ZentraQuotationMilestoneService } from './zentra-quotation-milestone.service';
import { CreateZentraQuotationMilestoneDto } from './dto/create-zentra-quotation-milestone.dto';
import { UpdateZentraQuotationMilestoneDto } from './dto/update-zentra-quotation-milestone.dto';

@Controller('zentra-quotation-milestones') // Ruta semántica para hitos
export class ZentraQuotationMilestoneController {
  constructor(
    private readonly milestoneService: ZentraQuotationMilestoneService,
  ) {}

  @Post()
  create(@Body() createDto: CreateZentraQuotationMilestoneDto) {
    return this.milestoneService.create(createDto);
  }

  @Get()
  findAll() {
    return this.milestoneService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.milestoneService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string, 
    @Body() updateDto: UpdateZentraQuotationMilestoneDto
  ) {
    return this.milestoneService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.milestoneService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.milestoneService.restore(id);
  }

  @Get('quotation/:quotationId')
  findByQuotation(@Param('quotationId') quotationId: string) {
    return this.milestoneService.findByQuotation(quotationId);
  }
}