import { Model } from 'mongoose';
import { Company, CompanyDocument } from './company.schema';
export declare class CompanyService {
    private companyModel;
    constructor(companyModel: Model<CompanyDocument>);
    createCompany(companyData: Partial<Company>): Promise<Company>;
    addUserToCompany(companyId: string, userId: string): Promise<Company>;
    addBrandToCompany(companyId: string, brandId: string): Promise<Company>;
    findCompanyByEmail(email: string): Promise<Company | null>;
    getUsersOfCompany(companyId: string): Promise<any[]>;
}
