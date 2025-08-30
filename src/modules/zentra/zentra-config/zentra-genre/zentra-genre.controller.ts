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

import { ZentraGenreService } from './zentra-genre.service';
import { CreateZentraGenreDto } from './dto/create-zentra-genre.dto';
import { UpdateZentraGenreDto } from './dto/update-zentra-genre.dto';
import { JwtAuthGuard } from '../../../../auth/shared/guards/jwt-auth.guard';
import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-genres')
//@UseGuards(JwtAuthGuard)
export class ZentraGenreController {
  constructor(private readonly zentraGenreService: ZentraGenreService) { }

  @Post()
  create(@Body() createZentraGenreDto: CreateZentraGenreDto) {
    return this.zentraGenreService.create(createZentraGenreDto);
  }

  @Get()
  findAll() {
    return this.zentraGenreService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const genre = await this.zentraGenreService.findOne(id);
    if (!genre) {
      throw new NotFoundException('Rol no encontrado');
    }
    return genre;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateZentraGenreDto: UpdateZentraGenreDto) {
    const genre = await this.zentraGenreService.findOne(id);
    if (!genre) {
      throw new NotFoundException('Rol no encontrado');
    }
    return this.zentraGenreService.update(id, updateZentraGenreDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const genre = await this.zentraGenreService.findOne(id);
    if (!genre) {
      throw new NotFoundException('Rol no encontrado');
    }
    return this.zentraGenreService.remove(id);
  }

  @Patch(':id/restore')
  async restore(@Param('id') id: string) {
    const genre = await this.zentraGenreService.findOne(id);
    if (!genre) {
      throw new NotFoundException('Rol no encontrado');
    }
    return this.zentraGenreService.restore(id);
  }
}