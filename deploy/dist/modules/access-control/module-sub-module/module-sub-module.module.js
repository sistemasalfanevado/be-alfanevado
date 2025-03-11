"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleSubModuleModule = void 0;
const common_1 = require("@nestjs/common");
const module_sub_module_controller_1 = require("./module-sub-module.controller");
const module_sub_module_service_1 = require("./module-sub-module.service");
const prisma_module_1 = require("../../../prisma/prisma.module");
let ModuleSubModuleModule = class ModuleSubModuleModule {
};
exports.ModuleSubModuleModule = ModuleSubModuleModule;
exports.ModuleSubModuleModule = ModuleSubModuleModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [module_sub_module_controller_1.ModuleSubModuleController],
        providers: [module_sub_module_service_1.ModuleSubModuleService],
    })
], ModuleSubModuleModule);
//# sourceMappingURL=module-sub-module.module.js.map