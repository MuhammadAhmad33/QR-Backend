import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { CompanyDocument } from '../company/company.schema';
export declare class UserService {
    private userModel;
    private companyModel;
    constructor(userModel: Model<UserDocument>, companyModel: Model<CompanyDocument>);
    createUser(userData: Partial<User>): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
}
