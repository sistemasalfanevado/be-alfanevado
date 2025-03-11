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
exports.ModuleSubModuleController = void 0;
const common_1 = require("@nestjs/common");
const module_sub_module_service_1 = require("./module-sub-module.service");
const create_module_sub_module_dto_1 = require("./dto/create-module-sub-module.dto");
const update_module_sub_module_dto_1 = require("./dto/update-module-sub-module.dto");
let ModuleSubModuleController = class ModuleSubModuleController {
    moduleSubModuleService;
    constructor(moduleSubModuleService) {
        this.moduleSubModuleService = moduleSubModuleService;
    }
    create(createModuleSubModuleDto) {
        return this.moduleSubModuleService.create(createModuleSubModuleDto);
    }
    findAll() {
        return this.moduleSubModuleService.findAll();
    }
    findOne(moduleId, subModuleId) {
        return this.moduleSubModuleService.findOne(moduleId, subModuleId);
    }
    update(moduleId, subModuleId, updateModuleSubModuleDto) {
        return this.moduleSubModuleService.update(moduleId, subModuleId, updateModuleSubModuleDto);
    }
    remove(moduleId, subModuleId) {
        return this.moduleSubModuleService.remove(moduleId, subModuleId);
    }
};
exports.ModuleSubModuleController = ModuleSubModuleController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_module_sub_module_dto_1.CreateModuleSubModuleDto]),
    __metadata("design:returntype", void 0)
], ModuleSubModuleController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ModuleSubModuleController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':moduleId/:subModuleId'),
    __param(0, (0, common_1.Param)('moduleId')),
    __param(1, (0, common_1.Param)('subModuleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ModuleSubModuleController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':moduleId/:subModuleId'),
    __param(0, (0, common_1.Param)('moduleId')),
    __param(1, (0, common_1.Param)('subModuleId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_module_sub_module_dto_1.UpdateModuleSubModuleDto]),
    __metadata("design:returntype", void 0)
], ModuleSubModuleController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':moduleId/:subModuleId'),
    __param(0, (0, common_1.Param)('moduleId')),
    __param(1, (0, common_1.Param)('subModuleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ModuleSubModuleController.prototype, "remove", null);
exports.ModuleSubModuleController = ModuleSubModuleController = __decorate([
    (0, common_1.Controller)('module-sub-module'),
    __metadata("design:paramtypes", [module_sub_module_service_1.ModuleSubModuleService])
], ModuleSubModuleController);
//# sourceMappingURL=module-sub-module.controller.js.map