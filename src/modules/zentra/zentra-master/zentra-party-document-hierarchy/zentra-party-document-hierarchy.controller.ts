import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Put,
  Delete,
} from '@nestjs/common';
import { ZentraPartyDocumentHierarchyService } from './zentra-party-document-hierarchy.service';
import { CreateZentraPartyDocumentHierarchyDto } from './dto/create-zentra-party-document-hierarchy.dto';
import { UpdateZentraPartyDocumentHierarchyDto } from './dto/update-zentra-party-document-hierarchy.dto';

@Controller('zentra-party-document-hierarchies')
export class ZentraPartyDocumentHierarchyController {
  constructor(
    private readonly zentraPartyDocumentHierarchyService: ZentraPartyDocumentHierarchyService,
  ) {}

  @Post()
  async create(@Body() createDto: CreateZentraPartyDocumentHierarchyDto) {
    await this.zentraPartyDocumentHierarchyService.create(createDto);
    return { message: 'Jerarquía de documento creada correctamente.' };
  }

  @Get()
  findAll() {
    return this.zentraPartyDocumentHierarchyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraPartyDocumentHierarchyService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateZentraPartyDocumentHierarchyDto,
  ) {
    await this.zentraPartyDocumentHierarchyService.update(id, updateDto);
    return { message: 'Jerarquía de documento actualizada correctamente.' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.zentraPartyDocumentHierarchyService.remove(id);
    return { message: 'Jerarquía de documento eliminada correctamente.' };
  }

  @Patch(':id/restore')
  async restore(@Param('id') id: string) {
    await this.zentraPartyDocumentHierarchyService.restore(id);
    return { message: 'Jerarquía de documento restaurada correctamente.' };
  }
}