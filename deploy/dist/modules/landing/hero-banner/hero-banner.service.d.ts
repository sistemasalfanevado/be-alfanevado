import { PrismaService } from '../../../prisma/prisma.service';
import { CreateHeroBannerDto } from './dto/create-hero-banner.dto';
import { UpdateHeroBannerDto } from './dto/update-hero-banner.dto';
export declare class HeroBannerService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createHeroBannerDto: CreateHeroBannerDto): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        subtitle: string;
        linkImage: string;
        nameImage: string;
        pageId: string;
    }>;
    findAll(): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        subtitle: string;
        linkImage: string;
        nameImage: string;
        pageId: string;
    }[]>;
    findAllByPage(pageId: string): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        subtitle: string;
        linkImage: string;
        nameImage: string;
        pageId: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        subtitle: string;
        linkImage: string;
        nameImage: string;
        pageId: string;
    } | null>;
    update(id: string, updateHeroBannerDto: UpdateHeroBannerDto): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        subtitle: string;
        linkImage: string;
        nameImage: string;
        pageId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        subtitle: string;
        linkImage: string;
        nameImage: string;
        pageId: string;
    }>;
    restore(id: string): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        subtitle: string;
        linkImage: string;
        nameImage: string;
        pageId: string;
    }>;
}
