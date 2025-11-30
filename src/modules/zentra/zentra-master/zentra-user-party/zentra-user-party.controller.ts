import { Controller, Get, Post, Body, Param, Patch, Put, Delete } from '@nestjs/common';
import { ZentraUserPartyService } from './zentra-user-party.service';
import { CreateZentraUserPartyDto } from './dto/create-zentra-user-party.dto';
import { UpdateZentraUserPartyDto } from './dto/update-zentra-user-party.dto';
import { JwtAuthGuard } from '../../../../auth/shared/guards/jwt-auth.guard';
import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-user-parties')
//@UseGuards(JwtAuthGuard)
export class ZentraUserPartyController {
  constructor(private readonly zentraUserPartyService: ZentraUserPartyService) {}

  @Post()
  create(@Body() createZentraUserPartyDto: CreateZentraUserPartyDto) {
    return this.zentraUserPartyService.create(createZentraUserPartyDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.zentraUserPartyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraUserPartyService.findOne(id);
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