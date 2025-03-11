import { PrismaService } from '../../../prisma/prisma.service';
import { CreateLotStatusDto } from './dto/create-lot-status.dto';
import { UpdateLotStatusDto } from './dto/update-lot-status.dto';
export declare class LotStatusService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createLotStatusDto: CreateLotStatusDto): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        title: string;
    }>;
    findAll(): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        title: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        title: string;
    } | null>;
    update(id: string, updateLotStatusDto: UpdateLotStatusDto): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        title: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        title: string;
    }>;
    restore(id: string): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        title: string;
    }>;
}
