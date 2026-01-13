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

import { ZentraRoleService } from './zentra-role.service';
import { CreateZentraRoleDto } from './dto/create-zentra-role.dto';
import { UpdateZentraRoleDto } from './dto/update-zentra-role.dto';

@Controller('zentra-role')
export class ZentraRoleController {
  constructor(private readonly zentraRoleService: ZentraRoleService) {}

  @Post()
  create(@Body() createZentraRoleDto: CreateZentraRoleDto) {
    return this.zentraRoleService.create(createZentraRoleDto);
  }

  @Get()
  findAll() {
    return this.zentraRoleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const role = await this.zentraRoleService.findOne(id);
    if (!role) {
      throw new NotFoundException('Rol no encontrado');
    }
    return role;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateZentraRoleDto: UpdateZentraRoleDto) {
    const role = await this.zentraRoleService.findOne(id);
    if (!role) {
      throw new NotFoundException('Rol no encontrado');
    }
    return this.zentraRoleService.update(id, updateZentraRoleDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const role = await this.zentraRoleService.findOne(id);
    if (!role) {
      throw new NotFoundException('Rol no encontrado');
    }
    return this.zentraRoleService.remove(id);
  }

  @Patch(':id/restore')
  async restore(@Param('id') id: string) {
    const role = await this.zentraRoleService.findOne(id);
    if (!role) {
      throw new NotFoundException('Rol no encontrado');
    }
    return this.zentraRoleService.restore(id);
  }
}