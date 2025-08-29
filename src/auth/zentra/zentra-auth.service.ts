import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ZentraUsersService } from '../../modules/zentra/zentra-config/zentra-users/zentra-users.service';

import * as bcrypt from 'bcrypt';

@Injectable()
export class ZentraAuthService {
  constructor(
    private zentraUsersService: ZentraUsersService, // Asegúrate de que esto esté inyectado
    private jwtService: JwtService, // Asegúrate de que esto esté inyectado
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.zentraUsersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  } 

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}