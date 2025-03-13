import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { BitrixService } from './bitrix.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard'
import { Public } from '../../auth/decorators/public.decorator'; 

@Controller('bitrix')
@UseGuards(JwtAuthGuard)
export class BitrixController {
  constructor(private readonly bitrixService: BitrixService) {}

  @Post('lead')
  @Public()
  async sendLead(@Body() formData: any) {
    return this.bitrixService.createLead(formData);
  }
}