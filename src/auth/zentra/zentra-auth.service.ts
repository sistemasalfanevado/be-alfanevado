import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ZentraUsersService } from '../../modules/zentra/zentra-config/zentra-users/zentra-users.service';
import { ZentraExchangeRateService } from '../../modules/zentra/zentra-master/zentra-exchange-rate/zentra-exchange-rate.service';
import { ZentraUserPartyService } from '../../modules/zentra/zentra-master/zentra-user-party/zentra-user-party.service';

import * as bcrypt from 'bcrypt';

@Injectable()
export class ZentraAuthService {
  constructor(
    private zentraExchangeRateService: ZentraExchangeRateService,
    private zentraUserPartyService: ZentraUserPartyService,
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
          icon: group.name.toLowerCase(),
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

    const today = new Date();
    const normalizedDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const actions = user.role?.roleActions?.map((ra) => ra.action.id) || [];

    let exchangeRate = await this.zentraExchangeRateService.findOneByDate(normalizedDate);
    if (!exchangeRate) {
      exchangeRate = await this.zentraExchangeRateService.upsertTodayRateFromSunat();
    }

    const userParty = await this.zentraUserPartyService.findByUserId(user.id);



    return {
      access_token: this.jwtService.sign(payload),
      id: user.id,
      fullName: `${user.firstName} ${user.lastName}`,
      firstName: `${user.firstName}`,
      lastName: `${user.firstName}`,
      profileUrl: user.profileUrl,
      mainRoute: user.mainRoute,
      role: user.role?.name,
      roleId: user.role?.id,
      gender: user.genre?.name,
      genreId: user.genre?.id,
      email: user.email,
      menuItems,
      exchangeRate,
      actions,

      partyId: userParty.partyId,
      partyName: userParty.partyName,

    };
  }
}

