import { 
  Controller, Get, Post, Body, Param, Patch, Put, Delete, UseGuards 
} from '@nestjs/common';
import { ZentraBrokerService } from './zentra-broker.service';
import { CreateZentraBrokerDto } from './dto/create-zentra-broker.dto';
import { UpdateZentraBrokerDto } from './dto/update-zentra-broker.dto';

import { JwtAuthGuard } from '../../../../auth/shared/guards/jwt-auth.guard';
import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-brokers')
// @UseGuards(JwtAuthGuard)  // Descomenta si quieres proteger todas las rutas
export class ZentraBrokerController {
  constructor(private readonly zentraBrokerService: ZentraBrokerService) {}

  @Post()
  create(@Body() createZentraBrokerDto: CreateZentraBrokerDto) {
    return this.zentraBrokerService.create(createZentraBrokerDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.zentraBrokerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraBrokerService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateZentraBrokerDto: UpdateZentraBrokerDto,
  ) {
    return this.zentraBrokerService.update(id, updateZentraBrokerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraBrokerService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraBrokerService.restore(id);
  }
}