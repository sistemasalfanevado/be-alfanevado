import { ModuleSubModuleService } from './module-sub-module.service';
import { CreateModuleSubModuleDto } from './dto/create-module-sub-module.dto';
import { UpdateModuleSubModuleDto } from './dto/update-module-sub-module.dto';
export declare class ModuleSubModuleController {
    private readonly moduleSubModuleService;
    constructor(moduleSubModuleService: ModuleSubModuleService);
    create(createModuleSubModuleDto: CreateModuleSubModuleDto): Promise<{
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        moduleId: string;
        subModuleId: string;
    }>;
    findAll(): Promise<{
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        moduleId: string;
        subModuleId: string;
    }[]>;
    findOne(moduleId: string, subModuleId: string): Promise<{
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        moduleId: string;
        subModuleId: string;
    } | null>;
    update(moduleId: string, subModuleId: string, updateModuleSubModuleDto: UpdateModuleSubModuleDto): Promise<{
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        moduleId: string;
        subModuleId: string;
    }>;
    remove(moduleId: string, subModuleId: string): Promise<{
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        moduleId: string;
        subModuleId: string;
    }>;
}
