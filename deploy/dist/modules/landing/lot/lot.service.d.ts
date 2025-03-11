import { PrismaService } from '../../../prisma/prisma.service';
import { CreateLotDto } from './dto/create-lot.dto';
import { UpdateLotDto } from './dto/update-lot.dto';
export declare class LotService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createLotDto: CreateLotDto): Promise<{
        number: string;
        name: string;
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        pageId: string;
        block: string;
        code: string;
        statusId: string;
    }>;
    findAll(): Promise<({
        page: {
            id: string;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            route: string;
            title: string;
        };
        status: {
            id: string;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            title: string;
        };
    } & {
        number: string;
        name: string;
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        pageId: string;
        block: string;
        code: string;
        statusId: string;
    })[]>;
    findAllByPage(pageId: string): Promise<{
        statusTitle: string;
        status: undefined;
        number: string;
        name: string;
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        pageId: string;
        block: string;
        code: string;
        statusId: string;
    }[]>;
    findOne(id: string): Promise<({
        page: {
            id: string;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            route: string;
            title: string;
        };
        status: {
            id: string;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            title: string;
        };
    } & {
        number: string;
        name: string;
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        pageId: string;
        block: string;
        code: string;
        statusId: string;
    }) | null>;
    update(id: string, updateLotDto: UpdateLotDto): Promise<{
        number: string;
        name: string;
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        pageId: string;
        block: string;
        code: string;
        statusId: string;
    }>;
    remove(id: string): Promise<{
        number: string;
        name: string;
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        pageId: string;
        block: string;
        code: string;
        statusId: string;
    }>;
    restore(id: string): Promise<{
        number: string;
        name: string;
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        pageId: string;
        block: string;
        code: string;
        statusId: string;
    }>;
}
