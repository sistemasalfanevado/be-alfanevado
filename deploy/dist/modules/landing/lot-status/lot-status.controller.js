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
exports.LotStatusController = void 0;
const common_1 = require("@nestjs/common");
const lot_status_service_1 = require("./lot-status.service");
const create_lot_status_dto_1 = require("./dto/create-lot-status.dto");
const update_lot_status_dto_1 = require("./dto/update-lot-status.dto");
const passport_1 = require("@nestjs/passport");
let LotStatusController = class LotStatusController {
    lotStatusService;
    constructor(lotStatusService) {
        this.lotStatusService = lotStatusService;
    }
    create(createLotStatusDto) {
        return this.lotStatusService.create(createLotStatusDto);
    }
    findAll() {
        return this.lotStatusService.findAll();
    }
    findOne(id) {
        return this.lotStatusService.findOne(id);
    }
    update(id, updateLotStatusDto) {
        return this.lotStatusService.update(id, updateLotStatusDto);
    }
    remove(id) {
        return this.lotStatusService.remove(id);
    }
    restore(id) {
        return this.lotStatusService.restore(id);
    }
};
exports.LotStatusController = LotStatusController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_lot_status_dto_1.CreateLotStatusDto]),
    __metadata("design:returntype", void 0)
], LotStatusController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LotStatusController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LotStatusController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_lot_status_dto_1.UpdateLotStatusDto]),
    __metadata("design:returntype", void 0)
], LotStatusController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LotStatusController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/restore'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LotStatusController.prototype, "restore", null);
exports.LotStatusController = LotStatusController = __decorate([
    (0, common_1.Controller)('lot-status'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [lot_status_service_1.LotStatusService])
], LotStatusController);
//# sourceMappingURL=lot-status.controller.js.map