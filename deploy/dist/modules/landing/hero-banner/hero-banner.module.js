"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroBannerModule = void 0;
const common_1 = require("@nestjs/common");
const hero_banner_controller_1 = require("./hero-banner.controller");
const hero_banner_service_1 = require("./hero-banner.service");
const prisma_module_1 = require("../../../prisma/prisma.module");
const auth_module_1 = require("../../../auth/auth.module");
let HeroBannerModule = class HeroBannerModule {
};
exports.HeroBannerModule = HeroBannerModule;
exports.HeroBannerModule = HeroBannerModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, auth_module_1.AuthModule],
        controllers: [hero_banner_controller_1.HeroBannerController],
        providers: [hero_banner_service_1.HeroBannerService],
    })
], HeroBannerModule);
//# sourceMappingURL=hero-banner.module.js.map