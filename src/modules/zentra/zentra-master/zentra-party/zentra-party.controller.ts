import { Controller, Get, Post, Body, Param, Patch, Put, Delete, UseGuards } from '@nestjs/common';
import { ZentraPartyService } from './zentra-party.service';
import { CreateZentraPartyDto } from './dto/create-zentra-party.dto';
import { UpdateZentraPartyDto } from './dto/update-zentra-party.dto';
import { JwtAuthGuard } from '../../../../auth/shared/guards/jwt-auth.guard';
import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-parties')
//@UseGuards(JwtAuthGuard)
export class ZentraPartyController {
  constructor(private readonly zentraPartyService: ZentraPartyService) { }

  @Post()
  create(@Body() createZentraPartyDto: CreateZentraPartyDto) {
    return this.zentraPartyService.create(createZentraPartyDto);
  }

  @Post('complex')
  createComplex(@Body() createZentraPartyDto: any) {
    return this.zentraPartyService.createComplex(createZentraPartyDto);
  }

  @Get()
  @Public()
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