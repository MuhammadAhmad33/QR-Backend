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
    const company = await this.companyModel.findById(userData.company);
    if (!company) {
      throw new Error('Company not found');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = new this.userModel({
      ...userData,
      password: hashedPassword,
      company: userData.company,
    });

    const createdUser = await user.save();

    await this.companyModel.findByIdAndUpdate(
      userData.company,
      { $push: { users: createdUser._id } },
      { new: true },
    );

    return createdUser;
  }

  async getUsers(userId: string): Promise<User[]> {
    const user = await this.userModel.findById(userId).populate('company').exec();
    if (!user || !user.company) {
      throw new Error('User or company not found');
    }
    const companyId = user.company['_id'].toString();
    return this.userModel.find({ company: companyId }).exec();
  }

  async getCompanyByUser(userId: string): Promise<Company> {
    const user = await this.userModel.findById(userId).populate('company').exec();
    if (!user) {
      throw new Error('User not found');
    }
    if (!user.company) {
      throw new Error('User does not belong to any company');
    }
    return user.company;
  }

  async updateUser(currentUserId: string, userId: string, updateData: Partial<User>): Promise<User> {
    // Ensure that only users in the same company can be updated
    const currentUser = await this.userModel.findById(currentUserId).populate('company').exec();
    const targetUser = await this.userModel.findById(userId).populate('company').exec();

    if (!currentUser || !targetUser) {
      throw new Error('Current user or target user not found');
    }

    if (currentUser.company['_id'].toString() !== targetUser.company['_id'].toString()) {
      throw new Error('You do not have permission to update this user');
    }

    return this.userModel.findByIdAndUpdate(userId, updateData, { new: true }).exec();
  }

  async deleteUser(currentUserId: string, userId: string): Promise<void> {
    // Ensure that only users in the same company can be deleted
    const currentUser = await this.userModel.findById(currentUserId).populate('company').exec();
    const targetUser = await this.userModel.findById(userId).populate('company').exec();

    if (!currentUser || !targetUser) {
      throw new Error('Current user or target user not found');
    }

    if (currentUser.company['_id'].toString() !== targetUser.company['_id'].toString()) {
      throw new Error('You do not have permission to delete this user');
    }

    await this.userModel.findByIdAndDelete(userId).exec();

    // Remove the user from the company's `users` array
    await this.companyModel.findByIdAndUpdate(
      targetUser.company['_id'],
      { $pull: { users: targetUser._id } },
      { new: true },
    );
  }
}
