import { PrismaService } from '../../../prisma/prisma.service';
import { CreateContentSliderDto } from './dto/create-content-slider.dto';
import { UpdateContentSliderDto } from './dto/update-content-slider.dto';
export declare class ContentSliderService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createContentSliderDto: CreateContentSliderDto): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        subtitle: string;
        pageId: string;
        linkImage1: string | null;
        linkImage2: string | null;
        nameImage1: string | null;
        nameImage2: string | null;
        linkImage3: string | null;
        linkImage4: string | null;
        nameImage3: string | null;
        nameImage4: string | null;
    }>;
    findAll(): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        subtitle: string;
        pageId: string;
        linkImage1: string | null;
        linkImage2: string | null;
        nameImage1: string | null;
        nameImage2: string | null;
        linkImage3: string | null;
        linkImage4: string | null;
        nameImage3: string | null;
        nameImage4: string | null;
    }[]>;
    findAllByPage(pageId: string): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        subtitle: string;
        pageId: string;
        linkImage1: string | null;
        linkImage2: string | null;
        nameImage1: string | null;
        nameImage2: string | null;
        linkImage3: string | null;
        linkImage4: string | null;
        nameImage3: string | null;
        nameImage4: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        subtitle: string;
        pageId: string;
        linkImage1: string | null;
        linkImage2: string | null;
        nameImage1: string | null;
        nameImage2: string | null;
        linkImage3: string | null;
        linkImage4: string | null;
        nameImage3: string | null;
        nameImage4: string | null;
    } | null>;
    update(id: string, updateContentSliderDto: UpdateContentSliderDto): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        subtitle: string;
        pageId: string;
        linkImage1: string | null;
        linkImage2: string | null;
        nameImage1: string | null;
        nameImage2: string | null;
        linkImage3: string | null;
        linkImage4: string | null;
        nameImage3: string | null;
        nameImage4: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        subtitle: string;
        pageId: string;
        linkImage1: string | null;
        linkImage2: string | null;
        nameImage1: string | null;
        nameImage2: string | null;
        linkImage3: string | null;
        linkImage4: string | null;
        nameImage3: string | null;
        nameImage4: string | null;
    }>;
    restore(id: string): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        subtitle: string;
        pageId: string;
        linkImage1: string | null;
        linkImage2: string | null;
        nameImage1: string | null;
        nameImage2: string | null;
        linkImage3: string | null;
        linkImage4: string | null;
        nameImage3: string | null;
        nameImage4: string | null;
    }>;
}
