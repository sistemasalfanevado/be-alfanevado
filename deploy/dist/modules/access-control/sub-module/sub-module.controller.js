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
exports.SubModuleController = void 0;
const common_1 = require("@nestjs/common");
const sub_module_service_1 = require("./sub-module.service");
const create_sub_module_dto_1 = require("./dto/create-sub-module.dto");
const update_sub_module_dto_1 = require("./dto/update-sub-module.dto");
let SubModuleController = class SubModuleController {
    subModuleService;
    constructor(subModuleService) {
        this.subModuleService = subModuleService;
    }
    create(createSubModuleDto) {
        return this.subModuleService.create(createSubModuleDto);
    }
    findAll() {
        return this.subModuleService.findAll();
    }
    findOne(id) {
        return this.subModuleService.findOne(id);
    }
    update(id, updateSubModuleDto) {
        return this.subModuleService.update(id, updateSubModuleDto);
    }
    remove(id) {
        return this.subModuleService.remove(id);
    }
};
exports.SubModuleController = SubModuleController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sub_module_dto_1.CreateSubModuleDto]),
    __metadata("design:returntype", void 0)
], SubModuleController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SubModuleController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SubModuleController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_sub_module_dto_1.UpdateSubModuleDto]),
    __metadata("design:returntype", void 0)
], SubModuleController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SubModuleController.prototype, "remove", null);
exports.SubModuleController = SubModuleController = __decorate([
    (0, common_1.Controller)('sub-module'),
    __metadata("design:paramtypes", [sub_module_service_1.SubModuleService])
], SubModuleController);
//# sourceMappingURL=sub-module.controller.js.map