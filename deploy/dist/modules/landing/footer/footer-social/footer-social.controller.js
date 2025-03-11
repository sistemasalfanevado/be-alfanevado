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
exports.FooterSocialController = void 0;
const common_1 = require("@nestjs/common");
const footer_social_service_1 = require("./footer-social.service");
const create_footer_social_dto_1 = require("./dto/create-footer-social.dto");
const update_footer_social_dto_1 = require("./dto/update-footer-social.dto");
const passport_1 = require("@nestjs/passport");
let FooterSocialController = class FooterSocialController {
    footerSocialService;
    constructor(footerSocialService) {
        this.footerSocialService = footerSocialService;
    }
    create(createFooterSocialDto) {
        return this.footerSocialService.create(createFooterSocialDto);
    }
    findAll() {
        return this.footerSocialService.findAll();
    }
    findOne(id) {
        return this.footerSocialService.findOne(id);
    }
    update(id, updateFooterSocialDto) {
        return this.footerSocialService.update(id, updateFooterSocialDto);
    }
    remove(id) {
        return this.footerSocialService.remove(id);
    }
    restore(id) {
        return this.footerSocialService.restore(id);
    }
};
exports.FooterSocialController = FooterSocialController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_footer_social_dto_1.CreateFooterSocialDto]),
    __metadata("design:returntype", void 0)
], FooterSocialController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FooterSocialController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FooterSocialController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_footer_social_dto_1.UpdateFooterSocialDto]),
    __metadata("design:returntype", void 0)
], FooterSocialController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FooterSocialController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/restore'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FooterSocialController.prototype, "restore", null);
exports.FooterSocialController = FooterSocialController = __decorate([
    (0, common_1.Controller)('footer-social'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [footer_social_service_1.FooterSocialService])
], FooterSocialController);
//# sourceMappingURL=footer-social.controller.js.map