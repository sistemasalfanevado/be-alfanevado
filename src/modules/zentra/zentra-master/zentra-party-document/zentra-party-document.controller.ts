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
import { ZentraPartyDocumentService } from './zentra-party-document.service';
import { CreateZentraPartyDocumentDto } from './dto/create-zentra-party-document.dto';
import { UpdateZentraPartyDocumentDto } from './dto/update-zentra-party-document.dto';

@Controller('zentra-party-documents')
export class ZentraPartyDocumentController {
  constructor(
    private readonly zentraPartyDocumentService: ZentraPartyDocumentService,
  ) { }

  @Post()
  async create(@Body() createDto: CreateZentraPartyDocumentDto) {
    await this.zentraPartyDocumentService.create(createDto);
    return { message: 'Documento de parte creado correctamente' };
  }

  @Get()
  async findAll() {
    return this.zentraPartyDocumentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.zentraPartyDocumentService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateZentraPartyDocumentDto,
  ) {
    await this.zentraPartyDocumentService.update(id, updateDto);
    return { message: 'Documento de parte actualizado correctamente' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.zentraPartyDocumentService.remove(id);
    return { message: 'Documento de parte eliminado correctamente' };
  }

  @Patch(':id/restore')
  async restore(@Param('id') id: string) {
    await this.zentraPartyDocumentService.restore(id);
    return { message: 'Documento de parte restaurado correctamente' };
  }

  @Get('party/:partyId')
  findByParty(@Param('partyId') partyId: string) {
    return this.zentraPartyDocumentService.findByPartyId(partyId);
  }


  @Post('partyManyPrincipal')
  findPartiesWithMultiplePrincipals() {
    return this.zentraPartyDocumentService.findPartiesWithMultiplePrincipals();
  }

  @Post('fixMultiplePrincipals')
  fixMultiplePrincipals() {
    return this.zentraPartyDocumentService.fixMultiplePrincipals();
  }


}