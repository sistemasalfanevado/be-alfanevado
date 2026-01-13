import { 
  Controller, Get, Post, Body, Param, Patch, Put, Delete, UseGuards 
} from '@nestjs/common';
import { ZentraSaleTypeService } from './zentra-sale-type.service';
import { CreateZentraSaleTypeDto } from './dto/create-zentra-sale-type.dto';
import { UpdateZentraSaleTypeDto } from './dto/update-zentra-sale-type.dto';

@Controller('zentra-sale-types')
export class ZentraSaleTypeController {
  constructor(private readonly zentraSaleTypeService: ZentraSaleTypeService) {}

  @Post()
  create(@Body() createZentraSaleTypeDto: CreateZentraSaleTypeDto) {
    return this.zentraSaleTypeService.create(createZentraSaleTypeDto);
  }

  @Get()
  findAll() {
    return this.zentraSaleTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraSaleTypeService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateZentraSaleTypeDto: UpdateZentraSaleTypeDto,
  ) {
    return this.zentraSaleTypeService.update(id, updateZentraSaleTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraSaleTypeService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraSaleTypeService.restore(id);
  }
}