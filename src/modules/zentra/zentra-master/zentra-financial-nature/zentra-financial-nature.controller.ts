import { Controller, Get, Post, Body, Param, Patch, Put, Delete } from '@nestjs/common';
import { ZentraFinancialNatureService } from './zentra-financial-nature.service';
import { CreateZentraFinancialNatureDto } from './dto/create-zentra-financial-nature.dto';
import { UpdateZentraFinancialNatureDto } from './dto/update-zentra-financial-nature.dto';
import { JwtAuthGuard } from '../../../../auth/shared/guards/jwt-auth.guard';
import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-financial-natures')
//@UseGuards(JwtAuthGuard)
export class ZentraFinancialNatureController {
  constructor(private readonly zentraFinancialNatureService: ZentraFinancialNatureService) {}

  @Post()
  create(@Body() createZentraFinancialNatureDto: CreateZentraFinancialNatureDto) {
    return this.zentraFinancialNatureService.create(createZentraFinancialNatureDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.zentraFinancialNatureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraFinancialNatureService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string, 
    @Body() updateZentraFinancialNatureDto: UpdateZentraFinancialNatureDto
  ) {
    return this.zentraFinancialNatureService.update(id, updateZentraFinancialNatureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraFinancialNatureService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraFinancialNatureService.restore(id);
  }
}