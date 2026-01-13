import { Controller, Get, Post, Body, Param, Patch, Put, Delete } from '@nestjs/common';
import { ZentraDocumentFileService } from './zentra-document-file.service';
import { CreateZentraDocumentFileDto } from './dto/create-zentra-document-file.dto';
import { UpdateZentraDocumentFileDto } from './dto/update-zentra-document-file.dto';

@Controller('zentra-document-files')
export class ZentraDocumentFileController {
  constructor(private readonly zentraDocumentFileService: ZentraDocumentFileService) {}

  @Post()
  create(@Body() createDto: CreateZentraDocumentFileDto) {
    return this.zentraDocumentFileService.create(createDto);
  }

  @Get()
  findAll() {
    return this.zentraDocumentFileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraDocumentFileService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateZentraDocumentFileDto) {
    return this.zentraDocumentFileService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraDocumentFileService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraDocumentFileService.restore(id);
  }

  @Get('/by-document/:documentId')
  findByDocument(@Param('documentId') documentId: string) {
    return this.zentraDocumentFileService.findByDocumentId(documentId);
  }

  

}