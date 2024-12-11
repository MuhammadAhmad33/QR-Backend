import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../users/user.schema';
import { Brand } from '../trademarks/trademark.schema';

export type CompanyDocument = Company & Document;

@Schema()
export class Company {
  @Prop({ required: true })
  companyName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  companyWebsite: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  users: User[]; // A company can have many users

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Trademark' }] })
  brands: Brand[]; // A company can own many trademarks (brands)
}

export const CompanySchema = SchemaFactory.createForClass(Company);
