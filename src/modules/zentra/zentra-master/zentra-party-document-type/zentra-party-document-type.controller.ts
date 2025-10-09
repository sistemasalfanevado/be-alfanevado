import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Put,
  Delete
} from '@nestjs/common';
import { ZentraPartyDocumentTypeService } from './zentra-party-document-type.service';
import { CreateZentraPartyDocumentTypeDto } from './dto/create-zentra-party-document-type.dto';
import { UpdateZentraPartyDocumentTypeDto } from './dto/update-zentra-party-document-type.dto';

@Controller('zentra-party-document-types')
export class ZentraPartyDocumentTypeController {
  constructor(
    private readonly zentraPartyDocumentTypeService: ZentraPartyDocumentTypeService,
  ) { }

  @Post()
  async create(@Body() createDto: CreateZentraPartyDocumentTypeDto) {
    await this.zentraPartyDocumentTypeService.create(createDto);
    return { message: 'Tipo de documento creado correctamente' };
  }

  @Get()
  findAll() {
    return this.zentraPartyDocumentTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraPartyDocumentTypeService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateZentraPartyDocumentTypeDto,
  ) {
    await this.zentraPartyDocumentTypeService.update(id, updateDto);
    return { message: 'Tipo de documento actualizado correctamente' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.zentraPartyDocumentTypeService.remove(id);
    return { message: 'Tipo de documento eliminado correctamente' };
  }

  @Patch(':id/restore')
  async restore(@Param('id') id: string) {
    await this.zentraPartyDocumentTypeService.restore(id);
    return { message: 'Tipo de documento restaurado correctamente' };
  }
}