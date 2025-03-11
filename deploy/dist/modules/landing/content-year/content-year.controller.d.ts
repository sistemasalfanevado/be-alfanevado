import { ContentYearService } from './content-year.service';
import { CreateContentYearDto } from './dto/create-content-year.dto';
import { UpdateContentYearDto } from './dto/update-content-year.dto';
export declare class ContentYearController {
    private readonly contentYearService;
    constructor(contentYearService: ContentYearService);
    create(createContentYearDto: CreateContentYearDto): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        subtitle: string;
        linkImage: string;
        nameImage: string;
        pageId: string;
        year: string;
        yearMessage: string;
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
        year: string;
        yearMessage: string;
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
        year: string;
        yearMessage: string;
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
        year: string;
        yearMessage: string;
    } | null>;
    update(id: string, updateContentYearDto: UpdateContentYearDto): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        subtitle: string;
        linkImage: string;
        nameImage: string;
        pageId: string;
        year: string;
        yearMessage: string;
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
        year: string;
        yearMessage: string;
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
        year: string;
        yearMessage: string;
    }>;
}
