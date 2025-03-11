import { PrismaService } from '../../../prisma/prisma.service';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
export declare class FeatureService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createFeatureDto: CreateFeatureDto): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        detail: string;
        icon: string;
        pageId: string;
    }>;
    findAll(): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        detail: string;
        icon: string;
        pageId: string;
    }[]>;
    findAllByPage(pageId: string): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        detail: string;
        icon: string;
        pageId: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        detail: string;
        icon: string;
        pageId: string;
    } | null>;
    update(id: string, updateFeatureDto: UpdateFeatureDto): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        detail: string;
        icon: string;
        pageId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        detail: string;
        icon: string;
        pageId: string;
    }>;
    restore(id: string): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        detail: string;
        icon: string;
        pageId: string;
    }>;
}
