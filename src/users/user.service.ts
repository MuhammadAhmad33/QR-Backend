import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { Brand} from '../trademarks/trademark.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async createUser(userData: Partial<User>): Promise<User> {
    const user = new this.userModel(userData);
    return user.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).populate('brands').exec();
  }

  async addBrandToUser(userId: string, brandId: string): Promise<User> {
    return this.userModel.findByIdAndUpdate(
      userId,
      { $push: { brands: new Types.ObjectId(brandId) } },
      { new: true },
    ).populate('brands');
  }
}
