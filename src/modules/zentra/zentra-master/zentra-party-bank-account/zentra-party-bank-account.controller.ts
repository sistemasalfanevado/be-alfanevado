import { Controller, Get, Post, Body, Param, Patch, Put, Delete, UseGuards } from '@nestjs/common';
import { ZentraPartyBankAccountService } from './zentra-party-bank-account.service';
import { CreateZentraPartyBankAccountDto } from './dto/create-zentra-party-bank-account.dto';
import { UpdateZentraPartyBankAccountDto } from './dto/update-zentra-party-bank-account.dto';

@Controller('zentra-party-bank-accounts')
export class ZentraPartyBankAccountController {
  constructor(private readonly zentraPartyBankAccountService: ZentraPartyBankAccountService) { }

  @Post()
  create(@Body() createZentraPartyBankAccountDto: CreateZentraPartyBankAccountDto) {
    return this.zentraPartyBankAccountService.create(createZentraPartyBankAccountDto);
  }

  @Get()
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

  @Post('partyManyPrincipal')
  findPartiesWithMultiplePrincipals() {
    return this.zentraPartyBankAccountService.findPartiesWithMultiplePrincipals();
  }

  @Post('fixMultiplePrincipals')
  fixMultiplePrincipals() {
    return this.zentraPartyBankAccountService.fixMultiplePrincipals();
  }
  

}