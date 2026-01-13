import { Controller, Get, Post, Body, Param, Patch, Put, Delete, UseGuards } from '@nestjs/common';
import { ZentraPartyRoleService } from './zentra-party-role.service';
import { CreateZentraPartyRoleDto } from './dto/create-zentra-party-role.dto';
import { UpdateZentraPartyRoleDto } from './dto/update-zentra-party-role.dto';

@Controller('zentra-party-roles')
export class ZentraPartyRoleController {
  constructor(private readonly zentraPartyRoleService: ZentraPartyRoleService) {}

  @Post()
  create(@Body() createZentraPartyRoleDto: CreateZentraPartyRoleDto) {
    return this.zentraPartyRoleService.create(createZentraPartyRoleDto);
  }

  @Get()
  findAll() {
    return this.zentraPartyRoleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraPartyRoleService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateZentraPartyRoleDto: UpdateZentraPartyRoleDto) {
    return this.zentraPartyRoleService.update(id, updateZentraPartyRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraPartyRoleService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraPartyRoleService.restore(id);
  }
}