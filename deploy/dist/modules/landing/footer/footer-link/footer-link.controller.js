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
exports.FooterLinkController = void 0;
const common_1 = require("@nestjs/common");
const footer_link_service_1 = require("./footer-link.service");
const create_footer_link_dto_1 = require("./dto/create-footer-link.dto");
const update_footer_link_dto_1 = require("./dto/update-footer-link.dto");
const passport_1 = require("@nestjs/passport");
let FooterLinkController = class FooterLinkController {
    footerLinkService;
    constructor(footerLinkService) {
        this.footerLinkService = footerLinkService;
    }
    create(createFooterLinkDto) {
        return this.footerLinkService.create(createFooterLinkDto);
    }
    findAll() {
        return this.footerLinkService.findAll();
    }
    findOne(id) {
        return this.footerLinkService.findOne(id);
    }
    update(id, updateFooterLinkDto) {
        return this.footerLinkService.update(id, updateFooterLinkDto);
    }
    remove(id) {
        return this.footerLinkService.remove(id);
    }
    restore(id) {
        return this.footerLinkService.restore(id);
    }
};
exports.FooterLinkController = FooterLinkController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_footer_link_dto_1.CreateFooterLinkDto]),
    __metadata("design:returntype", void 0)
], FooterLinkController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FooterLinkController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FooterLinkController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_footer_link_dto_1.UpdateFooterLinkDto]),
    __metadata("design:returntype", void 0)
], FooterLinkController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FooterLinkController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/restore'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FooterLinkController.prototype, "restore", null);
exports.FooterLinkController = FooterLinkController = __decorate([
    (0, common_1.Controller)('footer-link'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [footer_link_service_1.FooterLinkService])
], FooterLinkController);
//# sourceMappingURL=footer-link.controller.js.map