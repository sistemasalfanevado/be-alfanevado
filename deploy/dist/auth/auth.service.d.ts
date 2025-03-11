import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AccessControlService } from '../access-control/access-control.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    private accessControlService;
    constructor(usersService: UsersService, jwtService: JwtService, accessControlService: AccessControlService);
    validateUser(email: string, password: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        modules: {
            module: string;
            subModules: string[];
        }[];
    }>;
}
