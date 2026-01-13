import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { ZentraAuthService } from './zentra-auth.service';
import { ZentraLoginDto } from '../shared/dto/zentra-login.dto';
import { Public } from '../shared/decorators/public.decorator'; 

@Controller('zentra-auth')
export class ZentraAuthController {
  constructor(private zentraAuthService: ZentraAuthService) { }
  
  @Public()
  @Post('login')
  async login(@Body() zentraLoginDto: ZentraLoginDto) {
    const user = await this.zentraAuthService.validateUser(
      zentraLoginDto.email,
      zentraLoginDto.password,
    );

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return this.zentraAuthService.login(user);
  }
}