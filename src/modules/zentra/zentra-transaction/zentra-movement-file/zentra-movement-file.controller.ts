import { Controller, Get, Post, Body, Param, Patch, Put, Delete } from '@nestjs/common';
import { ZentraMovementFileService } from './zentra-movement-file.service';
import { CreateZentraMovementFileDto } from './dto/create-zentra-movement-file.dto';
import { UpdateZentraMovementFileDto } from './dto/update-zentra-movement-file.dto';
import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-movement-files')
export class ZentraMovementFileController {
  constructor(private readonly zentraMovementFileService: ZentraMovementFileService) {}

  @Post()
  create(@Body() createDto: CreateZentraMovementFileDto) {
    return this.zentraMovementFileService.create(createDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.zentraMovementFileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraMovementFileService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateZentraMovementFileDto) {
    return this.zentraMovementFileService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraMovementFileService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraMovementFileService.restore(id);
  }

  @Get('/by-movement/:movementId')
  findByMovement(@Param('movementId') movementId: string) {
    return this.zentraMovementFileService.findByMovementId(movementId);
  }

  

}