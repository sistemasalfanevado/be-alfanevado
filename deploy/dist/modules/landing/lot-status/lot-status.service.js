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
exports.LotStatusService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let LotStatusService = class LotStatusService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createLotStatusDto) {
        return this.prisma.landingLotStatus.create({
            data: createLotStatusDto,
        });
    }
    async findAll() {
        return this.prisma.landingLotStatus.findMany({
            where: { deletedAt: null },
        });
    }
    async findOne(id) {
        return this.prisma.landingLotStatus.findUnique({
            where: { id, deletedAt: null },
        });
    }
    async update(id, updateLotStatusDto) {
        return this.prisma.landingLotStatus.update({
            where: { id },
            data: updateLotStatusDto,
        });
    }
    async remove(id) {
        return this.prisma.landingLotStatus.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
    async restore(id) {
        return this.prisma.landingLotStatus.update({
            where: { id },
            data: { deletedAt: null },
        });
    }
};
exports.LotStatusService = LotStatusService;
exports.LotStatusService = LotStatusService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LotStatusService);
//# sourceMappingURL=lot-status.service.js.map