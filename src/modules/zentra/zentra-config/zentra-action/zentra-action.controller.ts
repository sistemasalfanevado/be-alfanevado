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

import { ZentraActionService } from './zentra-action.service';
import { CreateZentraActionDto } from './dto/create-zentra-action.dto';
import { UpdateZentraActionDto } from './dto/update-zentra-action.dto';
import { JwtAuthGuard } from '../../../../auth/shared/guards/jwt-auth.guard';
import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-action')
//@UseGuards(JwtAuthGuard) // si quieres protegerlo con JWT
export class ZentraActionController {
  constructor(private readonly zentraActionService: ZentraActionService) {}

  @Post()
  create(@Body() createZentraActionDto: CreateZentraActionDto) {
    return this.zentraActionService.create(createZentraActionDto);
  }

  @Get()
  findAll() {
    return this.zentraActionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const action = await this.zentraActionService.findOne(id);
    if (!action) {
      throw new NotFoundException('Acción no encontrada');
    }
    return action;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateZentraActionDto: UpdateZentraActionDto) {
    const action = await this.zentraActionService.findOne(id);
    if (!action) {
      throw new NotFoundException('Acción no encontrada');
    }
    return this.zentraActionService.update(id, updateZentraActionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const action = await this.zentraActionService.findOne(id);
    if (!action) {
      throw new NotFoundException('Acción no encontrada');
    }
    return this.zentraActionService.remove(id);
  }

  @Patch(':id/restore')
  async restore(@Param('id') id: string) {
    const action = await this.zentraActionService.findOne(id);
    if (!action) {
      throw new NotFoundException('Acción no encontrada');
    }
    return this.zentraActionService.restore(id);
  }
}