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

import { ZentraPageService } from './zentra-page.service';
import { CreateZentraPageDto } from './dto/create-zentra-page.dto';
import { UpdateZentraPageDto } from './dto/update-zentra-page.dto';
import { JwtAuthGuard } from '../../../auth/shared/guards/jwt-auth.guard';
import { Public } from '../../../auth/shared/decorators/public.decorator';

@Controller('zentra-page')
@UseGuards(JwtAuthGuard)
export class ZentraPageController {
  constructor(private readonly zentraPageService: ZentraPageService) {}

  @Post()
  create(@Body() createZentraPageDto: CreateZentraPageDto) {
    return this.zentraPageService.create(createZentraPageDto);
  }

  @Get()
  findAll() {
    return this.zentraPageService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const page = await this.zentraPageService.findOne(id);
    if (!page) {
      throw new NotFoundException('Página no encontrada');
    }
    return page;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateZentraPageDto: UpdateZentraPageDto) {
    const page = await this.zentraPageService.findOne(id);
    if (!page) {
      throw new NotFoundException('Página no encontrada');
    }
    return this.zentraPageService.update(id, updateZentraPageDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const page = await this.zentraPageService.findOne(id);
    if (!page) {
      throw new NotFoundException('Página no encontrada');
    }
    return this.zentraPageService.remove(id);
  }

  @Patch(':id/restore')
  async restore(@Param('id') id: string) {
    const page = await this.zentraPageService.findOne(id);
    if (!page) {
      throw new NotFoundException('Página no encontrada');
    }
    return this.zentraPageService.restore(id);
  }
}