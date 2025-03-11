import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AccessControlService } from '../access-control/access-control.service';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, // Asegúrate de que esto esté inyectado
    private jwtService: JwtService, // Asegúrate de que esto esté inyectado
    private accessControlService: AccessControlService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };

    // Obtener módulos y submódulos del usuario
    const userAccess = await this.accessControlService.getUserModulesAndSubModules(user.id);
    
    return {
      access_token: this.jwtService.sign(payload),
      modules: userAccess
    };
  }
}