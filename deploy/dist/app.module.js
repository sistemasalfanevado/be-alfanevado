"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const prisma_module_1 = require("./prisma/prisma.module");
const footer_contact_module_1 = require("./modules/landing/footer/footer-contact/footer-contact.module");
const footer_link_module_1 = require("./modules/landing/footer/footer-link/footer-link.module");
const footer_social_module_1 = require("./modules/landing/footer/footer-social/footer-social.module");
const hero_banner_module_1 = require("./modules/landing/hero-banner/hero-banner.module");
const feature_module_1 = require("./modules/landing/feature/feature.module");
const project_module_1 = require("./modules/landing/project/project.module");
const content_module_1 = require("./modules/landing/content/content.module");
const content_year_module_1 = require("./modules/landing/content-year/content-year.module");
const content_slider_module_1 = require("./modules/landing/content-slider/content-slider.module");
const lot_status_module_1 = require("./modules/landing/lot-status/lot-status.module");
const lot_module_1 = require("./modules/landing/lot/lot.module");
const page_module_1 = require("./modules/landing/page/page.module");
const module_module_1 = require("./modules/access-control/module/module.module");
const module_sub_module_module_1 = require("./modules/access-control/module-sub-module/module-sub-module.module");
const sub_module_module_1 = require("./modules/access-control/sub-module/sub-module.module");
const user_module_module_1 = require("./modules/access-control/user-module/user-module.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [users_module_1.UsersModule, auth_module_1.AuthModule, prisma_module_1.PrismaModule,
            footer_contact_module_1.FooterContactModule,
            footer_link_module_1.FooterLinkModule,
            footer_social_module_1.FooterSocialModule,
            hero_banner_module_1.HeroBannerModule,
            feature_module_1.FeatureModule,
            project_module_1.ProjectModule,
            content_module_1.ContentModule,
            content_year_module_1.ContentYearModule,
            content_slider_module_1.ContentSliderModule,
            lot_status_module_1.LotStatusModule,
            lot_module_1.LotModule,
            page_module_1.PageModule,
            module_module_1.ModuleModule,
            module_sub_module_module_1.ModuleSubModuleModule,
            sub_module_module_1.SubModuleModule,
            user_module_module_1.UserModuleModule
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map