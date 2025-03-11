import { FooterSocialService } from './footer-social.service';
import { CreateFooterSocialDto } from './dto/create-footer-social.dto';
import { UpdateFooterSocialDto } from './dto/update-footer-social.dto';
export declare class FooterSocialController {
    private readonly footerSocialService;
    constructor(footerSocialService: FooterSocialService);
    create(createFooterSocialDto: CreateFooterSocialDto): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        icon: string;
        link: string;
    }>;
    findAll(): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        icon: string;
        link: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        icon: string;
        link: string;
    } | null>;
    update(id: string, updateFooterSocialDto: UpdateFooterSocialDto): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        icon: string;
        link: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        icon: string;
        link: string;
    }>;
    restore(id: string): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        icon: string;
        link: string;
    }>;
}
