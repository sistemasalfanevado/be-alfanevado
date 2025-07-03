import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/landing/auth.module';

import { UsersModule } from './landing/users/users.module';

import { FooterContactModule } from './landing/footer/footer-contact/footer-contact.module';
import { FooterLinkModule } from './landing/footer/footer-link/footer-link.module';
import { FooterSocialModule } from './landing/footer/footer-social/footer-social.module';

import { HeroBannerModule } from './landing/hero-banner/hero-banner.module';
import { FeatureModule } from './landing/feature/feature.module';
import { ProjectModule } from './landing/project/project.module';

import { ContentModule } from './landing/content/content.module';
import { ContentYearModule } from './landing/content-year/content-year.module';
import { ContentSliderModule } from './landing/content-slider/content-slider.module';

import { LotStatusModule } from './landing/lot-status/lot-status.module';
import { LotModule } from './landing/lot/lot.module';
import { SettingsModule } from './landing/setting/setting.module';
import { PageModule } from './landing/page/page.module';

import { CompleteProjectModule } from './landing/complete-project/complete-project.module';
import { TermConditionModule } from './landing/term-condition/term-condition.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
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
    SettingsModule,
    PageModule,
    CompleteProjectModule,
    TermConditionModule,
  ],
})
export class LandingMainModule {}