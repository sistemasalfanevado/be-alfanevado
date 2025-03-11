import { HeroBannerService } from './hero-banner.service';
import { CreateHeroBannerDto } from './dto/create-hero-banner.dto';
import { UpdateHeroBannerDto } from './dto/update-hero-banner.dto';
export declare class HeroBannerController {
    private readonly heroBannerService;
    constructor(heroBannerService: HeroBannerService);
    create(createHeroBannerDto: CreateHeroBannerDto): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        subtitle: string;
        linkImage: string;
        nameImage: string;
        pageId: string;
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
    } | null>;
    update(id: string, updateHeroBannerDto: UpdateHeroBannerDto): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        subtitle: string;
        linkImage: string;
        nameImage: string;
        pageId: string;
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
    }>;
}
