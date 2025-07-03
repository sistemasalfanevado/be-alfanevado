import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ZentraAuthService } from './zentra-auth.service';
import { ZentraLoginDto } from '../shared/dto/zentra-login.dto';
import { AuthGuard } from '@nestjs/passport'; // Importa AuthGuard

@Controller('auth')
export class ZentraAuthController {
  constructor(private zentraAuthService: ZentraAuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() zentraLoginDto: ZentraLoginDto) {
    return this.zentraAuthService.login(zentraLoginDto);
  }
}