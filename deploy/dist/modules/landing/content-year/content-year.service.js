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
exports.ContentYearService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let ContentYearService = class ContentYearService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createContentYearDto) {
        return this.prisma.landingContentYear.create({
            data: {
                year: createContentYearDto.year,
                yearMessage: createContentYearDto.yearMessage,
                title: createContentYearDto.title,
                subtitle: createContentYearDto.subtitle,
                linkImage: createContentYearDto.linkImage,
                nameImage: createContentYearDto.nameImage,
                page: {
                    connect: { id: createContentYearDto.pageId },
                },
            },
        });
    }
    async findAll() {
        return this.prisma.landingContentYear.findMany({
            where: { deletedAt: null },
        });
    }
    async findAllByPage(pageId) {
        return this.prisma.landingContentYear.findMany({
            where: { deletedAt: null, pageId },
        });
    }
    async findOne(id) {
        return this.prisma.landingContentYear.findUnique({
            where: { id, deletedAt: null },
        });
    }
    async update(id, updateContentYearDto) {
        return this.prisma.landingContentYear.update({
            where: { id },
            data: updateContentYearDto,
        });
    }
    async remove(id) {
        return this.prisma.landingContentYear.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
    async restore(id) {
        return this.prisma.landingContentYear.update({
            where: { id },
            data: { deletedAt: null },
        });
    }
};
exports.ContentYearService = ContentYearService;
exports.ContentYearService = ContentYearService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ContentYearService);
//# sourceMappingURL=content-year.service.js.map