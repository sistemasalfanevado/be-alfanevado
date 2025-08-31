import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ZentraUsersService } from '../../modules/zentra/zentra-config/zentra-users/zentra-users.service';

import * as bcrypt from 'bcrypt';

@Injectable()
export class ZentraAuthService {
  constructor(
    private zentraUsersService: ZentraUsersService, // Asegúrate de que esto esté inyectado
    private jwtService: JwtService, // Asegúrate de que esto esté inyectado
  ) { }

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

    // Extraer permisos
    const permissions = user.role?.permissions || [];

    // Agrupar por pageGroup
    const grouped = permissions.reduce((acc, perm) => {
      const page = perm.page;
      const group = page.pageGroup;

      if (!acc[group.id]) {
        acc[group.id] = {
          key: group.name.toLowerCase().replace(/\s+/g, '-'),
          label: group.name,
          icon: group.name.toLowerCase(), // Aquí puedes mapear tus iconos personalizados
          children: [],
        };
      }

      acc[group.id].children.push({
        label: page.name,
        route: page.route,
      });

      return acc;
    }, {} as Record<string, any>);

    const menuItems = Object.values(grouped);

    return {
      access_token: this.jwtService.sign(payload),
      fullName: `${user.firstName} ${user.lastName}`,
      gender: user.genre?.name,
      profileUrl: user.profileUrl,
      role: user.role?.name,
      menuItems,
    };
  }
}