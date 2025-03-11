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
exports.FooterLinkService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../prisma/prisma.service");
let FooterLinkService = class FooterLinkService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createFooterLinkDto) {
        return this.prisma.landingFooterLink.create({
            data: createFooterLinkDto,
        });
    }
    async findAll() {
        return this.prisma.landingFooterLink.findMany({
            where: {
                deletedAt: null,
            },
        });
    }
    async findOne(id) {
        return this.prisma.landingFooterLink.findUnique({
            where: { id, deletedAt: null },
        });
    }
    async update(id, updateFooterLinkDto) {
        return this.prisma.landingFooterLink.update({
            where: { id },
            data: updateFooterLinkDto,
        });
    }
    async remove(id) {
        return this.prisma.landingFooterLink.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
    async restore(id) {
        return this.prisma.landingFooterLink.update({
            where: { id },
            data: { deletedAt: null },
        });
    }
};
exports.FooterLinkService = FooterLinkService;
exports.FooterLinkService = FooterLinkService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FooterLinkService);
//# sourceMappingURL=footer-link.service.js.map