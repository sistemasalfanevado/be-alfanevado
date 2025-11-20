import { Controller, Get, Post, Body, Param, Patch, Put, Delete } from '@nestjs/common';
import { ZentraInstallmentFileService } from './zentra-installment-file.service';
import { CreateZentraInstallmentFileDto } from './dto/create-zentra-installment-file.dto';
import { UpdateZentraInstallmentFileDto } from './dto/update-zentra-installment-file.dto';
import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-installment-files')
export class ZentraInstallmentFileController {
  constructor(private readonly zentraInstallmentFileService: ZentraInstallmentFileService) {}

  @Post()
  create(@Body() createDto: CreateZentraInstallmentFileDto) {
    return this.zentraInstallmentFileService.create(createDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.zentraInstallmentFileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraInstallmentFileService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateZentraInstallmentFileDto) {
    return this.zentraInstallmentFileService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraInstallmentFileService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraInstallmentFileService.restore(id);
  }

  @Get('/by-installment/:installmentId')
  findByInstallmentId(@Param('installmentId') installmentId: string) {
    return this.zentraInstallmentFileService.findByInstallmentId(installmentId);
  }

  

}