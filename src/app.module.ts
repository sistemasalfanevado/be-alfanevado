import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

import { FooterContactModule } from './modules/landing/footer/footer-contact/footer-contact.module';
import { FooterLinkModule } from './modules/landing/footer/footer-link/footer-link.module';
import { FooterSocialModule } from './modules/landing/footer/footer-social/footer-social.module';

import { HeroBannerModule } from './modules/landing/hero-banner/hero-banner.module';
import { FeatureModule } from './modules/landing/feature/feature.module';
import { ProjectModule } from './modules/landing/project/project.module';

import { ContentModule } from './modules/landing/content/content.module';
import { ContentYearModule } from './modules/landing/content-year/content-year.module';
import { ContentSliderModule } from './modules/landing/content-slider/content-slider.module';

import { LotStatusModule } from './modules/landing/lot-status/lot-status.module';
import { LotModule } from './modules/landing/lot/lot.module';

import { PageModule } from './modules/landing/page/page.module';

// Access Control
import { ModuleModule } from './modules/access-control/module/module.module';
import { ModuleSubModuleModule } from './modules/access-control/module-sub-module/module-sub-module.module';
import { SubModuleModule } from './modules/access-control/sub-module/sub-module.module';
import { UserModuleModule } from './modules/access-control/user-module/user-module.module';
import { BitrixModule } from './modules/bitrix/bitrix.module';


@Module({
  imports: [UsersModule, AuthModule, PrismaModule,

    FooterContactModule,
    FooterLinkModule,
    FooterSocialModule,
    HeroBannerModule,
    FeatureModule,
    ProjectModule,
    ContentModule,
    ContentYearModule,
    ContentSliderModule,
    LotStatusModule,
    LotModule,
    PageModule,

    ModuleModule,
    ModuleSubModuleModule,
    SubModuleModule,
    UserModuleModule,
    BitrixModule

  ],
})
export class AppModule { }