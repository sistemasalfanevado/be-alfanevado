import { FooterContactService } from './footer-contact.service';
import { CreateFooterContactDto } from './dto/create-footer-contact.dto';
import { UpdateFooterContactDto } from './dto/update-footer-contact.dto';
export declare class FooterContactController {
    private readonly footerContactService;
    constructor(footerContactService: FooterContactService);
    create(createFooterContactDto: CreateFooterContactDto): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        detail: string;
        icon: string;
    }>;
    findAll(): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        detail: string;
        icon: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        detail: string;
        icon: string;
    } | null>;
    update(id: string, updateFooterContactDto: UpdateFooterContactDto): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        detail: string;
        icon: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        detail: string;
        icon: string;
    }>;
    restore(id: string): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        detail: string;
        icon: string;
    }>;
}
