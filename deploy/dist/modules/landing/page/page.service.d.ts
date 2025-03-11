import { PrismaService } from '../../../prisma/prisma.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
export declare class PageService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createPageDto: CreatePageDto): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        route: string;
        title: string;
    }>;
    findAll(): Promise<({
        heroBanners: {
            id: string;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            subtitle: string;
            linkImage: string;
            nameImage: string;
            pageId: string;
        }[];
    } & {
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        route: string;
        title: string;
    })[]>;
    findOne(id: string): Promise<({
        heroBanners: {
            id: string;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            subtitle: string;
            linkImage: string;
            nameImage: string;
            pageId: string;
        }[];
    } & {
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        route: string;
        title: string;
    }) | null>;
    findByRoute(route: string): Promise<({
        heroBanners: {
            id: string;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            subtitle: string;
            linkImage: string;
            nameImage: string;
            pageId: string;
        }[];
    } & {
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        route: string;
        title: string;
    }) | null>;
    update(id: string, updatePageDto: UpdatePageDto): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        route: string;
        title: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        route: string;
        title: string;
    }>;
    restore(id: string): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        route: string;
        title: string;
    }>;
}
