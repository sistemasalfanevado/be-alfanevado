import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
export declare class ProjectController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    create(createProjectDto: CreateProjectDto): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        subtitle: string;
        pageId: string;
        linkImage1: string;
        linkImage2: string;
        nameImage1: string;
        nameImage2: string;
        textButton: string;
        linkRedirect1: string | null;
        linkRedirect2: string | null;
    }>;
    findAll(): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        subtitle: string;
        pageId: string;
        linkImage1: string;
        linkImage2: string;
        nameImage1: string;
        nameImage2: string;
        textButton: string;
        linkRedirect1: string | null;
        linkRedirect2: string | null;
    }[]>;
    findAllByPage(pageId: string): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        subtitle: string;
        pageId: string;
        linkImage1: string;
        linkImage2: string;
        nameImage1: string;
        nameImage2: string;
        textButton: string;
        linkRedirect1: string | null;
        linkRedirect2: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        subtitle: string;
        pageId: string;
        linkImage1: string;
        linkImage2: string;
        nameImage1: string;
        nameImage2: string;
        textButton: string;
        linkRedirect1: string | null;
        linkRedirect2: string | null;
    } | null>;
    update(id: string, updateProjectDto: UpdateProjectDto): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        subtitle: string;
        pageId: string;
        linkImage1: string;
        linkImage2: string;
        nameImage1: string;
        nameImage2: string;
        textButton: string;
        linkRedirect1: string | null;
        linkRedirect2: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        subtitle: string;
        pageId: string;
        linkImage1: string;
        linkImage2: string;
        nameImage1: string;
        nameImage2: string;
        textButton: string;
        linkRedirect1: string | null;
        linkRedirect2: string | null;
    }>;
    restore(id: string): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        subtitle: string;
        pageId: string;
        linkImage1: string;
        linkImage2: string;
        nameImage1: string;
        nameImage2: string;
        textButton: string;
        linkRedirect1: string | null;
        linkRedirect2: string | null;
    }>;
}
