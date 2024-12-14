import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Company, CompanyDocument } from './company.schema';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
  ) {}

  async createCompany(companyData: Partial<Company>): Promise<Company> {
    const company = new this.companyModel(companyData);
    return company.save();
  }

  async addUserToCompany(companyId: string, userId: string): Promise<Company> {
    return this.companyModel.findByIdAndUpdate(
      companyId,
      { $push: { users: new Types.ObjectId(userId) } },
      { new: true },
    ).populate('users');
  }

  async addBrandToCompany(companyId: string, brandId: string): Promise<Company> {
    return this.companyModel.findByIdAndUpdate(
      companyId,
      { $push: { brands: new Types.ObjectId(brandId) } },
      { new: true },
    ).populate('brands');
  }

  async findCompanyByEmail(email: string): Promise<Company | null> {
    return this.companyModel.findOne({ email }).populate(['users', 'brands']).exec();
  }

  async getUsersOfCompany(companyId: string): Promise<any[]> {
    const company = await this.companyModel.findById(companyId).populate({
      path: 'users', // Path to the users array
      model: 'User', // The referenced model
    });
  
    if (!company) {
      throw new Error('Company not found');
    }
  
    return company.users;
  }  
}
