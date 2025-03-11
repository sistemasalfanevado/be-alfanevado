import { UserModuleService } from './user-module.service';
import { CreateUserModuleDto } from './dto/create-user-module.dto';
import { UpdateUserModuleDto } from './dto/update-user-module.dto';
export declare class UserModuleController {
    private readonly userModuleService;
    constructor(userModuleService: UserModuleService);
    create(createUserModuleDto: CreateUserModuleDto): Promise<{
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        moduleId: string;
    }>;
    findAll(): Promise<{
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        moduleId: string;
    }[]>;
    findOne(userId: string, moduleId: string): Promise<{
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        moduleId: string;
    } | null>;
    update(userId: string, moduleId: string, updateUserModuleDto: UpdateUserModuleDto): Promise<{
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        moduleId: string;
    }>;
    remove(userId: string, moduleId: string): Promise<{
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        moduleId: string;
    }>;
}
