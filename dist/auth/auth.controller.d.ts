import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(body: {
        companyName: string;
        email: string;
        password: string;
        companyWebsite: string;
    }): Promise<{
        user: import("../users/user.schema").User;
        accessToken: string;
    }>;
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        accessToken: string;
    }>;
}
