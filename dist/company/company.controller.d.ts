import { CompanyService } from './company.service';
import { Company } from './company.schema';
export declare class CompanyController {
    private readonly companyService;
    constructor(companyService: CompanyService);
    createCompany(companyData: Partial<Company>): Promise<Company>;
    addUserToCompany(companyId: string, userId: string): Promise<Company>;
    addBrandToCompany(companyId: string, brandId: string): Promise<Company>;
    getUsersOfCompany(companyId: string): Promise<any[]>;
    findCompanyByEmail(email: string): Promise<Company | null>;
}
