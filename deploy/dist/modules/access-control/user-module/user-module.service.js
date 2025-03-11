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
exports.UserModuleService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let UserModuleService = class UserModuleService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserModuleDto) {
        return this.prisma.userModule.create({
            data: createUserModuleDto,
        });
    }
    async findAll() {
        return this.prisma.userModule.findMany();
    }
    async findOne(userId, moduleId) {
        return this.prisma.userModule.findUnique({
            where: { userId_moduleId: { userId, moduleId } },
        });
    }
    async update(userId, moduleId, updateUserModuleDto) {
        return this.prisma.userModule.update({
            where: { userId_moduleId: { userId, moduleId } },
            data: updateUserModuleDto,
        });
    }
    async remove(userId, moduleId) {
        return this.prisma.userModule.delete({
            where: { userId_moduleId: { userId, moduleId } },
        });
    }
};
exports.UserModuleService = UserModuleService;
exports.UserModuleService = UserModuleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserModuleService);
//# sourceMappingURL=user-module.service.js.map