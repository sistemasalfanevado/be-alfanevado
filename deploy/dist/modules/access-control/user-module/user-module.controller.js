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
exports.UserModuleController = void 0;
const common_1 = require("@nestjs/common");
const user_module_service_1 = require("./user-module.service");
const create_user_module_dto_1 = require("./dto/create-user-module.dto");
const update_user_module_dto_1 = require("./dto/update-user-module.dto");
let UserModuleController = class UserModuleController {
    userModuleService;
    constructor(userModuleService) {
        this.userModuleService = userModuleService;
    }
    create(createUserModuleDto) {
        return this.userModuleService.create(createUserModuleDto);
    }
    findAll() {
        return this.userModuleService.findAll();
    }
    findOne(userId, moduleId) {
        return this.userModuleService.findOne(userId, moduleId);
    }
    update(userId, moduleId, updateUserModuleDto) {
        return this.userModuleService.update(userId, moduleId, updateUserModuleDto);
    }
    remove(userId, moduleId) {
        return this.userModuleService.remove(userId, moduleId);
    }
};
exports.UserModuleController = UserModuleController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_module_dto_1.CreateUserModuleDto]),
    __metadata("design:returntype", void 0)
], UserModuleController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserModuleController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':userId/:moduleId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('moduleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UserModuleController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':userId/:moduleId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('moduleId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_user_module_dto_1.UpdateUserModuleDto]),
    __metadata("design:returntype", void 0)
], UserModuleController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':userId/:moduleId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('moduleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UserModuleController.prototype, "remove", null);
exports.UserModuleController = UserModuleController = __decorate([
    (0, common_1.Controller)('user-module'),
    __metadata("design:paramtypes", [user_module_service_1.UserModuleService])
], UserModuleController);
//# sourceMappingURL=user-module.controller.js.map