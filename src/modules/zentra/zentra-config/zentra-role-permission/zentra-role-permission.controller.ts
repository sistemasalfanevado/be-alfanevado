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

import { ZentraRolePermissionService } from './zentra-role-permission.service';
import { CreateZentraRolePermissionDto } from './dto/create-zentra-role-permission.dto';
import { UpdateZentraRolePermissionDto } from './dto/update-zentra-role-permission.dto';
import { JwtAuthGuard } from '../../../../auth/shared/guards/jwt-auth.guard';
import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-role-permission')
//@UseGuards(JwtAuthGuard)
export class ZentraRolePermissionController {
  constructor(private readonly zentraRolePermissionService: ZentraRolePermissionService) {}

  @Post()
  create(@Body() createZentraRolePermissionDto: CreateZentraRolePermissionDto) {
    return this.zentraRolePermissionService.create(createZentraRolePermissionDto);
  }

  @Get()
  findAll() {
    return this.zentraRolePermissionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const permission = await this.zentraRolePermissionService.findOne(id);
    if (!permission) {
      throw new NotFoundException('Permiso no encontrado');
    }
    return permission;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateZentraRolePermissionDto: UpdateZentraRolePermissionDto,
  ) {
    const permission = await this.zentraRolePermissionService.findOne(id);
    if (!permission) {
      throw new NotFoundException('Permiso no encontrado');
    }
    return this.zentraRolePermissionService.update(id, updateZentraRolePermissionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const permission = await this.zentraRolePermissionService.findOne(id);
    if (!permission) {
      throw new NotFoundException('Permiso no encontrado');
    }
    return this.zentraRolePermissionService.remove(id);
  }

  @Patch(':id/restore')
  async restore(@Param('id') id: string) {
    const permission = await this.zentraRolePermissionService.findOne(id);
    if (!permission) {
      throw new NotFoundException('Permiso no encontrado');
    }
    return this.zentraRolePermissionService.restore(id);
  }
}