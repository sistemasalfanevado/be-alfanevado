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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleSubModuleService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let ModuleSubModuleService = class ModuleSubModuleService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createModuleSubModuleDto) {
        return this.prisma.moduleSubModule.create({
            data: createModuleSubModuleDto,
        });
    }
    async findAll() {
        return this.prisma.moduleSubModule.findMany();
    }
    async findOne(moduleId, subModuleId) {
        return this.prisma.moduleSubModule.findUnique({
            where: { moduleId_subModuleId: { moduleId, subModuleId } },
        });
    }
    async update(moduleId, subModuleId, updateModuleSubModuleDto) {
        return this.prisma.moduleSubModule.update({
            where: { moduleId_subModuleId: { moduleId, subModuleId } },
            data: updateModuleSubModuleDto,
        });
    }
    async remove(moduleId, subModuleId) {
        return this.prisma.moduleSubModule.delete({
            where: { moduleId_subModuleId: { moduleId, subModuleId } },
        });
    }
};
exports.ModuleSubModuleService = ModuleSubModuleService;
exports.ModuleSubModuleService = ModuleSubModuleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ModuleSubModuleService);
//# sourceMappingURL=module-sub-module.service.js.map