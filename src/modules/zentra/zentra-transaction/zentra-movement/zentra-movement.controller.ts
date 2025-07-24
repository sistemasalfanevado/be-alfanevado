import { Controller, Get, Post, Body, Param, Patch, Put, Delete, UseGuards } from '@nestjs/common';
import { ZentraMovementService } from './zentra-movement.service';
import { CreateZentraMovementDto } from './dto/create-zentra-movement.dto';
import { UpdateZentraMovementDto } from './dto/update-zentra-movement.dto';
import { JwtAuthGuard } from '../../../../auth/shared/guards/jwt-auth.guard';
import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-movements')
//@UseGuards(JwtAuthGuard)
export class ZentraMovementController {
  constructor(private readonly zentraMovementService: ZentraMovementService) {}

  @Post()
  create(@Body() createDto: CreateZentraMovementDto) {
    return this.zentraMovementService.create(createDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.zentraMovementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraMovementService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateZentraMovementDto) {
    return this.zentraMovementService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraMovementService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraMovementService.restore(id);
  }
}