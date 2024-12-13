import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { Company, CompanyDocument } from '../company/company.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
  ) {}
  async createUser(userData: Partial<User>): Promise<User> {
    // Validate the provided company ID
    const company = await this.companyModel.findById(userData.company);
    if (!company) {
      throw new Error('Company not found');
    }
  
    // Hash the user's password with a salt round of 10
    const hashedPassword = await bcrypt.hash(userData.password, 10);
  
    // Create a new user associated with the company
    const user = new this.userModel({
      ...userData,
      password: hashedPassword, // Store the hashed password
      company: userData.company,
    });
  
    const createdUser = await user.save();
  
    // Add the new user to the company's `users` array
    await this.companyModel.findByIdAndUpdate(
      userData.company,
      { $push: { users: createdUser._id } },
      { new: true },
    );
  
    return createdUser;
  }
  

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).populate('company').exec();
  }
}
