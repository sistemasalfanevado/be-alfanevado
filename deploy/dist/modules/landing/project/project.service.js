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
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let ProjectService = class ProjectService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createProjectDto) {
        return this.prisma.landingProject.create({
            data: {
                linkImage1: createProjectDto.linkImage1,
                linkImage2: createProjectDto.linkImage2,
                nameImage1: createProjectDto.nameImage1,
                nameImage2: createProjectDto.nameImage2,
                title: createProjectDto.title,
                subtitle: createProjectDto.subtitle,
                textButton: createProjectDto.textButton,
                linkRedirect1: createProjectDto.linkRedirect1,
                linkRedirect2: createProjectDto.linkRedirect2,
                page: {
                    connect: { id: createProjectDto.pageId },
                },
            },
        });
    }
    async findAll() {
        return this.prisma.landingProject.findMany({
            where: { deletedAt: null },
        });
    }
    async findAllByPage(pageId) {
        return this.prisma.landingProject.findMany({
            where: { deletedAt: null, pageId },
        });
    }
    async findOne(id) {
        return this.prisma.landingProject.findUnique({
            where: { id, deletedAt: null },
        });
    }
    async update(id, updateProjectDto) {
        return this.prisma.landingProject.update({
            where: { id },
            data: updateProjectDto,
        });
    }
    async remove(id) {
        return this.prisma.landingProject.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
    async restore(id) {
        return this.prisma.landingProject.update({
            where: { id },
            data: { deletedAt: null },
        });
    }
};
exports.ProjectService = ProjectService;
exports.ProjectService = ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProjectService);
//# sourceMappingURL=project.service.js.map