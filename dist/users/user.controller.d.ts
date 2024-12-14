import { UserService } from './user.service';
import { User } from './user.schema';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(userData: Partial<User>, currentUser: any): Promise<User>;
    getUsers(user: any): Promise<User[]>;
    updateUser(userId: string, updateData: Partial<User>, currentUser: any): Promise<User>;
    deleteUser(userId: string, currentUser: any): Promise<{
        message: string;
    }>;
}
