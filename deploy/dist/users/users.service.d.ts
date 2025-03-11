import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        name: string;
        email: string;
        password: string;
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findByEmail(email: string): Promise<{
        name: string;
        email: string;
        password: string;
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    findAll(): Promise<{
        name: string;
        email: string;
        password: string;
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        name: string;
        email: string;
        password: string;
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        name: string;
        email: string;
        password: string;
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        name: string;
        email: string;
        password: string;
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    restore(id: string): Promise<{
        name: string;
        email: string;
        password: string;
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
