import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Patch,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';

import { ZentraTelecreditoConfigService } from './zentra-telecredito-config.service';
import { CreateZentraTelecreditoConfigDto } from './dto/create-zentra-telecredito-config.dto';
import { UpdateZentraTelecreditoConfigDto } from './dto/update-zentra-telecredito-config.dto';

@Controller('zentra-telecredito-config')
export class ZentraTelecreditoConfigController {
  constructor(
    private readonly zentraTelecreditoConfigService: ZentraTelecreditoConfigService,
  ) { }

  @Post()
  create(@Body() createDto: CreateZentraTelecreditoConfigDto) {
    return this.zentraTelecreditoConfigService.create(createDto);
  }

  @Get()
  findAll() {
    return this.zentraTelecreditoConfigService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const config = await this.zentraTelecreditoConfigService.findOne(id);
    if (!config) {
      throw new NotFoundException('Configuración no encontrada');
    }
    return config;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateZentraTelecreditoConfigDto,
  ) {
    const config = await this.zentraTelecreditoConfigService.findOne(id);
    if (!config) {
      throw new NotFoundException('Configuración no encontrada');
    }
    return this.zentraTelecreditoConfigService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const config = await this.zentraTelecreditoConfigService.findOne(id);
    if (!config) {
      throw new NotFoundException('Configuración no encontrada');
    }
    return this.zentraTelecreditoConfigService.remove(id);
  }

  @Patch(':id/restore')
  async restore(@Param('id') id: string) {
    const config = await this.zentraTelecreditoConfigService.findOne(id);
    if (!config) {
      throw new NotFoundException('Configuración no encontrada');
    }
    return this.zentraTelecreditoConfigService.restore(id);
  }

  @Post('by-bank-account')
  async findByBankAccountId(@Body('bankAccountId') bankAccountId: string) {
    return await this.zentraTelecreditoConfigService.findByBankAccountId(bankAccountId);
  }

}