import { Controller, Get, Post, Body, Param, Patch, Put, Delete, UseGuards } from '@nestjs/common';
import { ZentraPartyBankAccountService } from './zentra-party-bank-account.service';
import { CreateZentraPartyBankAccountDto } from './dto/create-zentra-party-bank-account.dto';
import { UpdateZentraPartyBankAccountDto } from './dto/update-zentra-party-bank-account.dto';

import { JwtAuthGuard } from '../../../../auth/shared/guards/jwt-auth.guard';
import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-party-bank-accounts')
//@UseGuards(JwtAuthGuard)
export class ZentraPartyBankAccountController {
  constructor(private readonly zentraPartyBankAccountService: ZentraPartyBankAccountService) { }

  @Post()
  create(@Body() createZentraPartyBankAccountDto: CreateZentraPartyBankAccountDto) {
    return this.zentraPartyBankAccountService.create(createZentraPartyBankAccountDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.zentraPartyBankAccountService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraPartyBankAccountService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateZentraPartyBankAccountDto: UpdateZentraPartyBankAccountDto) {
    return this.zentraPartyBankAccountService.update(id, updateZentraPartyBankAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraPartyBankAccountService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraPartyBankAccountService.restore(id);
  }

  @Get('party/:partyId')
  findByParty(@Param('partyId') partyId: string) {
    return this.zentraPartyBankAccountService.findByPartyId(partyId);
  }

}