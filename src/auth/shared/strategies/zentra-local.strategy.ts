import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ZentraAuthService } from '../../zentra/zentra-auth.service';

@Injectable()
export class ZentraLocalStrategy extends PassportStrategy(Strategy) {
  constructor(private zentraAuthService: ZentraAuthService) {
    super({ usernameField: 'email' }); // Configura el campo de nombre de usuario
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.zentraAuthService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}