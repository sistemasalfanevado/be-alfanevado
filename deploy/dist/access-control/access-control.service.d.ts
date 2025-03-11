import { PrismaService } from '../prisma/prisma.service';
export declare class AccessControlService {
    private prisma;
    constructor(prisma: PrismaService);
    getUserModulesAndSubModules(userId: string): Promise<{
        module: string;
        subModules: string[];
    }[]>;
}
