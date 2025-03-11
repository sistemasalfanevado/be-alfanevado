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
exports.ContentSliderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let ContentSliderService = class ContentSliderService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createContentSliderDto) {
        return this.prisma.landingContentSlider.create({
            data: {
                title: createContentSliderDto.title,
                subtitle: createContentSliderDto.subtitle,
                linkImage1: createContentSliderDto.linkImage1,
                linkImage2: createContentSliderDto.linkImage2,
                linkImage3: createContentSliderDto.linkImage3,
                linkImage4: createContentSliderDto.linkImage4,
                nameImage1: createContentSliderDto.nameImage1,
                nameImage2: createContentSliderDto.nameImage2,
                nameImage3: createContentSliderDto.nameImage3,
                nameImage4: createContentSliderDto.nameImage4,
                page: {
                    connect: { id: createContentSliderDto.pageId },
                },
            },
        });
    }
    async findAll() {
        return this.prisma.landingContentSlider.findMany({
            where: { deletedAt: null },
        });
    }
    async findAllByPage(pageId) {
        return this.prisma.landingContentSlider.findMany({
            where: { deletedAt: null, pageId },
        });
    }
    async findOne(id) {
        return this.prisma.landingContentSlider.findUnique({
            where: { id, deletedAt: null },
        });
    }
    async update(id, updateContentSliderDto) {
        return this.prisma.landingContentSlider.update({
            where: { id },
            data: updateContentSliderDto,
        });
    }
    async remove(id) {
        return this.prisma.landingContentSlider.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
    async restore(id) {
        return this.prisma.landingContentSlider.update({
            where: { id },
            data: { deletedAt: null },
        });
    }
};
exports.ContentSliderService = ContentSliderService;
exports.ContentSliderService = ContentSliderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ContentSliderService);
//# sourceMappingURL=content-slider.service.js.map