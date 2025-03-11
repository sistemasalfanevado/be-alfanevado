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
exports.HeroBannerService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let HeroBannerService = class HeroBannerService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createHeroBannerDto) {
        return this.prisma.landingHeroBanner.create({
            data: {
                title: createHeroBannerDto.title,
                subtitle: createHeroBannerDto.subtitle,
                linkImage: createHeroBannerDto.linkImage,
                nameImage: createHeroBannerDto.nameImage,
                page: {
                    connect: { id: createHeroBannerDto.pageId },
                },
            },
        });
    }
    async findAll() {
        return this.prisma.landingHeroBanner.findMany({
            where: { deletedAt: null },
        });
    }
    async findAllByPage(pageId) {
        return this.prisma.landingHeroBanner.findMany({
            where: { deletedAt: null, pageId },
        });
    }
    async findOne(id) {
        return this.prisma.landingHeroBanner.findUnique({
            where: { id, deletedAt: null },
        });
    }
    async update(id, updateHeroBannerDto) {
        return this.prisma.landingHeroBanner.update({
            where: { id },
            data: updateHeroBannerDto,
        });
    }
    async remove(id) {
        return this.prisma.landingHeroBanner.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
    async restore(id) {
        return this.prisma.landingHeroBanner.update({
            where: { id },
            data: { deletedAt: null },
        });
    }
};
exports.HeroBannerService = HeroBannerService;
exports.HeroBannerService = HeroBannerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], HeroBannerService);
//# sourceMappingURL=hero-banner.service.js.map