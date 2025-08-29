import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ZentraAuthService } from './zentra-auth.service';
import { ZentraLoginDto } from '../shared/dto/zentra-login.dto';
import { AuthGuard } from '@nestjs/passport'; // Importa AuthGuard

@Controller('zentra-auth') 
export class ZentraAuthController {
  constructor(private zentraAuthService: ZentraAuthService) {}

  @Post('login')
  async login(@Body() zentraLoginDto: ZentraLoginDto) {
    return this.zentraAuthService.login(zentraLoginDto);
  }
}