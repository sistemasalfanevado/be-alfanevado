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

import { ZentraRoleActionService } from './zentra-role-action.service';
import { CreateZentraRoleActionDto } from './dto/create-zentra-role-action.dto';
import { UpdateZentraRoleActionDto } from './dto/update-zentra-role-action.dto';
import { JwtAuthGuard } from '../../../../auth/shared/guards/jwt-auth.guard';
import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-role-action')
//@UseGuards(JwtAuthGuard)
export class ZentraRoleActionController {
  constructor(private readonly zentraRoleActionService: ZentraRoleActionService) {}

  @Post()
  create(@Body() createZentraRoleActionDto: CreateZentraRoleActionDto) {
    return this.zentraRoleActionService.create(createZentraRoleActionDto);
  }

  @Get()
  findAll() {
    return this.zentraRoleActionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const roleAction = await this.zentraRoleActionService.findOne(id);
    if (!roleAction) {
      throw new NotFoundException('Relación Rol-Acción no encontrada');
    }
    return roleAction;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateZentraRoleActionDto: UpdateZentraRoleActionDto,
  ) {
    const roleAction = await this.zentraRoleActionService.findOne(id);
    if (!roleAction) {
      throw new NotFoundException('Relación Rol-Acción no encontrada');
    }
    return this.zentraRoleActionService.update(id, updateZentraRoleActionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const roleAction = await this.zentraRoleActionService.findOne(id);
    if (!roleAction) {
      throw new NotFoundException('Relación Rol-Acción no encontrada');
    }
    return this.zentraRoleActionService.remove(id);
  }

  @Patch(':id/restore')
  async restore(@Param('id') id: string) {
    const roleAction = await this.zentraRoleActionService.findOne(id);
    if (!roleAction) {
      throw new NotFoundException('Relación Rol-Acción no encontrada');
    }
    return this.zentraRoleActionService.restore(id);
  }
}