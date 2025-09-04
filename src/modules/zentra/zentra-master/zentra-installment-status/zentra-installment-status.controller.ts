import { 
  Controller, Get, Post, Body, Param, Patch, Put, Delete, UseGuards 
} from '@nestjs/common';
import { ZentraInstallmentStatusService } from './zentra-installment-status.service';
import { CreateZentraInstallmentStatusDto } from './dto/create-zentra-installment-status.dto';
import { UpdateZentraInstallmentStatusDto } from './dto/update-zentra-installment-status.dto';

import { JwtAuthGuard } from '../../../../auth/shared/guards/jwt-auth.guard';
import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-installment-status')
//@UseGuards(JwtAuthGuard)
export class ZentraInstallmentStatusController {
  constructor(
    private readonly zentraInstallmentStatusService: ZentraInstallmentStatusService,
  ) {}

  @Post()
  create(@Body() createZentraInstallmentStatusDto: CreateZentraInstallmentStatusDto) {
    return this.zentraInstallmentStatusService.create(createZentraInstallmentStatusDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.zentraInstallmentStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraInstallmentStatusService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string, 
    @Body() updateZentraInstallmentStatusDto: UpdateZentraInstallmentStatusDto
  ) {
    return this.zentraInstallmentStatusService.update(id, updateZentraInstallmentStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraInstallmentStatusService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraInstallmentStatusService.restore(id);
  }
}