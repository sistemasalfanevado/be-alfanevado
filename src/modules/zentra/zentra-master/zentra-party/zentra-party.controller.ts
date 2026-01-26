import { Controller, Get, Post, Body, Param, Patch, Put, Delete, UseGuards } from '@nestjs/common';
import { ZentraPartyService } from './zentra-party.service';
import { CreateZentraPartyDto } from './dto/create-zentra-party.dto';
import { UpdateZentraPartyDto } from './dto/update-zentra-party.dto';
import { Public } from '../../../../auth/shared/decorators/public.decorator';
import { PARTY_DOCUMENT_TYPE } from 'src/shared/constants/app.constants';

@Controller('zentra-parties')
export class ZentraPartyController {
  constructor(private readonly zentraPartyService: ZentraPartyService) { }

  @Public()
  @Post('crm-dni')
  createCrmDni(@Body() body: any) {
    return this.zentraPartyService.createFromCrm(body, PARTY_DOCUMENT_TYPE.DNI);
  }

  @Public()
  @Post('crm-ruc')
  createCrmRuc(@Body() body: any) {
    return this.zentraPartyService.createFromCrm(body, PARTY_DOCUMENT_TYPE.RUC);
  }


  @Post()
  create(@Body() createZentraPartyDto: CreateZentraPartyDto) {
    return this.zentraPartyService.create(createZentraPartyDto);
  }

  @Post('complex')
  createComplex(@Body() createZentraPartyDto: any) {
    return this.zentraPartyService.createComplex(createZentraPartyDto);
  }


  @Get()
  findAll() {
    return this.zentraPartyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraPartyService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateZentraPartyDto: UpdateZentraPartyDto) {
    return this.zentraPartyService.update(id, updateZentraPartyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraPartyService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraPartyService.restore(id);
  }

  @Post('with-principal')
  findAllWithPrincipal(@Body() body: any) {
    return this.zentraPartyService.findAllWithPrincipal();
  }

  @Post('with-principal-deleted')
  findAllWithPrincipalDeleted(@Body() body: any) {
    return this.zentraPartyService.findAllWithPrincipalDeleted();
  }

  @Post('simple')
  findAllSimple(@Body() body: any) {
    return this.zentraPartyService.findAllSimple();
  }

  @Post('find-one-with-principal')
  async findOneWithPrincipal(@Body('id') id: string) {
    return this.zentraPartyService.findOneWithPrincipal(id);
  }


  @Post('clean-without-documents')
  async cleanPartiesWithoutDocuments(@Body() body: {
    preview: boolean;
  }) {
    return this.zentraPartyService.cleanPartiesWithoutDocuments(body.preview);
  }

  @Post('document-count-and-list')
  async getDocumentCountAndList(@Body('partyId') partyId: string) {
    return this.zentraPartyService.getPartyDocumentCountAndList(partyId);
  }

}