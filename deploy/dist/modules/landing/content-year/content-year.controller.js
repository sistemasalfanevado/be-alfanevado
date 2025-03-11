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
exports.ContentYearController = void 0;
const common_1 = require("@nestjs/common");
const content_year_service_1 = require("./content-year.service");
const create_content_year_dto_1 = require("./dto/create-content-year.dto");
const update_content_year_dto_1 = require("./dto/update-content-year.dto");
const passport_1 = require("@nestjs/passport");
let ContentYearController = class ContentYearController {
    contentYearService;
    constructor(contentYearService) {
        this.contentYearService = contentYearService;
    }
    create(createContentYearDto) {
        return this.contentYearService.create(createContentYearDto);
    }
    findAll() {
        return this.contentYearService.findAll();
    }
    findAllByPage(pageId) {
        return this.contentYearService.findAllByPage(pageId);
    }
    findOne(id) {
        return this.contentYearService.findOne(id);
    }
    update(id, updateContentYearDto) {
        return this.contentYearService.update(id, updateContentYearDto);
    }
    remove(id) {
        return this.contentYearService.remove(id);
    }
    restore(id) {
        return this.contentYearService.restore(id);
    }
};
exports.ContentYearController = ContentYearController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_content_year_dto_1.CreateContentYearDto]),
    __metadata("design:returntype", void 0)
], ContentYearController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ContentYearController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':pageId/page'),
    __param(0, (0, common_1.Param)('pageId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContentYearController.prototype, "findAllByPage", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContentYearController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_content_year_dto_1.UpdateContentYearDto]),
    __metadata("design:returntype", void 0)
], ContentYearController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContentYearController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/restore'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContentYearController.prototype, "restore", null);
exports.ContentYearController = ContentYearController = __decorate([
    (0, common_1.Controller)('content-year'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [content_year_service_1.ContentYearService])
], ContentYearController);
//# sourceMappingURL=content-year.controller.js.map