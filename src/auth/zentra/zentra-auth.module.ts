import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ZentraAuthService } from './zentra-auth.service';
import { ZentraAuthController } from './zentra-auth.controller';
import { ZentraUsersModule } from '../../modules/zentra/zentra-config/zentra-users/zentra-users.module';
import { ZentraLocalStrategy } from '../shared/strategies/zentra-local.strategy';
import { JwtStrategy } from '../shared/strategies/jwt.strategy';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { ZentraExchangeRateModule } from '../../modules/zentra/zentra-master/zentra-exchange-rate/zentra-exchange-rate.module'
import { ZentraUserPartyModule } from '../../modules/zentra/zentra-master/zentra-user-party/zentra-user-party.module'

@Module({
  imports: [
    ConfigModule,
    ZentraUsersModule,
    PassportModule,
    ZentraExchangeRateModule,
    ZentraUserPartyModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '8h' },
      }),
    }),
  ],
  controllers: [ZentraAuthController],
  providers: [ZentraAuthService, ZentraLocalStrategy, JwtStrategy],
})
export class ZentraAuthModule { }