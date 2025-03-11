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
exports.ContentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let ContentService = class ContentService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createContentDto) {
        return this.prisma.landingContent.create({
            data: {
                title: createContentDto.title,
                subtitle: createContentDto.subtitle,
                page: {
                    connect: { id: createContentDto.pageId },
                },
            },
        });
    }
    async findAll() {
        return this.prisma.landingContent.findMany({
            where: { deletedAt: null },
        });
    }
    async findAllByPage(pageId) {
        return this.prisma.landingContent.findMany({
            where: { deletedAt: null, pageId },
        });
    }
    async findOne(id) {
        return this.prisma.landingContent.findUnique({
            where: { id, deletedAt: null },
        });
    }
    async update(id, updateContentDto) {
        return this.prisma.landingContent.update({
            where: { id },
            data: updateContentDto,
        });
    }
    async remove(id) {
        return this.prisma.landingContent.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
    async restore(id) {
        return this.prisma.landingContent.update({
            where: { id },
            data: { deletedAt: null },
        });
    }
};
exports.ContentService = ContentService;
exports.ContentService = ContentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ContentService);
//# sourceMappingURL=content.service.js.map