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
exports.FooterContactController = void 0;
const common_1 = require("@nestjs/common");
const footer_contact_service_1 = require("./footer-contact.service");
const create_footer_contact_dto_1 = require("./dto/create-footer-contact.dto");
const update_footer_contact_dto_1 = require("./dto/update-footer-contact.dto");
const passport_1 = require("@nestjs/passport");
let FooterContactController = class FooterContactController {
    footerContactService;
    constructor(footerContactService) {
        this.footerContactService = footerContactService;
    }
    create(createFooterContactDto) {
        return this.footerContactService.create(createFooterContactDto);
    }
    findAll() {
        return this.footerContactService.findAll();
    }
    findOne(id) {
        return this.footerContactService.findOne(id);
    }
    update(id, updateFooterContactDto) {
        return this.footerContactService.update(id, updateFooterContactDto);
    }
    remove(id) {
        return this.footerContactService.remove(id);
    }
    restore(id) {
        return this.footerContactService.restore(id);
    }
};
exports.FooterContactController = FooterContactController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_footer_contact_dto_1.CreateFooterContactDto]),
    __metadata("design:returntype", void 0)
], FooterContactController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FooterContactController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FooterContactController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_footer_contact_dto_1.UpdateFooterContactDto]),
    __metadata("design:returntype", void 0)
], FooterContactController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FooterContactController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/restore'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FooterContactController.prototype, "restore", null);
exports.FooterContactController = FooterContactController = __decorate([
    (0, common_1.Controller)('footer-contact'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [footer_contact_service_1.FooterContactService])
], FooterContactController);
//# sourceMappingURL=footer-contact.controller.js.map