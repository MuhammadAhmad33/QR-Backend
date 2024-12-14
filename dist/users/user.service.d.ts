import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { Company, CompanyDocument } from '../company/company.schema';
export declare class UserService {
    private userModel;
    private companyModel;
    constructor(userModel: Model<UserDocument>, companyModel: Model<CompanyDocument>);
    createUser(userData: Partial<User>): Promise<User>;
    getUsers(userId: string): Promise<User[]>;
    getCompanyByUser(userId: string): Promise<Company>;
    updateUser(currentUserId: string, userId: string, updateData: Partial<User>): Promise<User>;
    deleteUser(currentUserId: string, userId: string): Promise<void>;
}
