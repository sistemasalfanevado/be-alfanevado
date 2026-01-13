import { Controller, Get, Post, Body, Param, Patch, Put, Delete } from '@nestjs/common';
import { ZentraUserPartyService } from './zentra-user-party.service';
import { CreateZentraUserPartyDto } from './dto/create-zentra-user-party.dto';
import { UpdateZentraUserPartyDto } from './dto/update-zentra-user-party.dto';

@Controller('zentra-user-parties')
export class ZentraUserPartyController {
  constructor(private readonly zentraUserPartyService: ZentraUserPartyService) { }

  @Post()
  create(@Body() createZentraUserPartyDto: CreateZentraUserPartyDto) {
    return this.zentraUserPartyService.create(createZentraUserPartyDto);
  }

  @Get()
  findAll() {
    return this.zentraUserPartyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraUserPartyService.findOne(id);
  }

  @Get('by-user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.zentraUserPartyService.findByUserId(userId);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateZentraUserPartyDto: UpdateZentraUserPartyDto
  ) {
    return this.zentraUserPartyService.update(id, updateZentraUserPartyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraUserPartyService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraUserPartyService.restore(id);
  }
}