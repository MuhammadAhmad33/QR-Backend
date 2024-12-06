// trademark.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Brand, BrandDocument } from './trademark.schema';

@Injectable()
export class TrademarkService {
  constructor(
    @InjectModel(Brand.name) private trademarkModel: Model<BrandDocument>,
  ) {}

  async createTrademark(data: { name: string; code: string; owner: string }) {
    const trademark = new this.trademarkModel(data);
    return trademark.save();
  }

  async getTrademarksByCompany(companyId: string) {
    return this.trademarkModel.find({ owner: companyId }); // Assuming owner is used as companyId
  }

  async getTrademarkById(id: string) {
    return this.trademarkModel.findById(id);
  }

  async updateTrademark(id: string, data: Partial<{ name: string; code: string; owner: string }>) {
    return this.trademarkModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteTrademark(id: string) {
    return this.trademarkModel.findByIdAndDelete(id);
  }
}