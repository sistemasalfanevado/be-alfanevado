"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroBannerController = void 0;
const common_1 = require("@nestjs/common");
const hero_banner_service_1 = require("./hero-banner.service");
const create_hero_banner_dto_1 = require("./dto/create-hero-banner.dto");
const update_hero_banner_dto_1 = require("./dto/update-hero-banner.dto");
const passport_1 = require("@nestjs/passport");
let HeroBannerController = class HeroBannerController {
    heroBannerService;
    constructor(heroBannerService) {
        this.heroBannerService = heroBannerService;
    }
    create(createHeroBannerDto) {
        return this.heroBannerService.create(createHeroBannerDto);
    }
    findAll() {
        return this.heroBannerService.findAll();
    }
    findAllByPage(pageId) {
        return this.heroBannerService.findAllByPage(pageId);
    }
    findOne(id) {
        return this.heroBannerService.findOne(id);
    }
    update(id, updateHeroBannerDto) {
        return this.heroBannerService.update(id, updateHeroBannerDto);
    }
    remove(id) {
        return this.heroBannerService.remove(id);
    }
    restore(id) {
        return this.heroBannerService.restore(id);
    }
};
exports.HeroBannerController = HeroBannerController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_hero_banner_dto_1.CreateHeroBannerDto]),
    __metadata("design:returntype", void 0)
], HeroBannerController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HeroBannerController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':pageId/page'),
    __param(0, (0, common_1.Param)('pageId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HeroBannerController.prototype, "findAllByPage", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HeroBannerController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_hero_banner_dto_1.UpdateHeroBannerDto]),
    __metadata("design:returntype", void 0)
], HeroBannerController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HeroBannerController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/restore'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HeroBannerController.prototype, "restore", null);
exports.HeroBannerController = HeroBannerController = __decorate([
    (0, common_1.Controller)('hero-banner'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [hero_banner_service_1.HeroBannerService])
], HeroBannerController);
//# sourceMappingURL=hero-banner.controller.js.map