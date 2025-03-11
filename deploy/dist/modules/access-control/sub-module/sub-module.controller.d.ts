import { SubModuleService } from './sub-module.service';
import { CreateSubModuleDto } from './dto/create-sub-module.dto';
import { UpdateSubModuleDto } from './dto/update-sub-module.dto';
export declare class SubModuleController {
    private readonly subModuleService;
    constructor(subModuleService: SubModuleService);
    create(createSubModuleDto: CreateSubModuleDto): Promise<{
        name: string;
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        route: string;
    }>;
    findAll(): Promise<{
        name: string;
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        route: string;
    }[]>;
    findOne(id: string): Promise<{
        name: string;
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        route: string;
    } | null>;
    update(id: string, updateSubModuleDto: UpdateSubModuleDto): Promise<{
        name: string;
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        route: string;
    }>;
    remove(id: string): Promise<{
        name: string;
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        route: string;
    }>;
}
