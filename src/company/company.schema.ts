import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../users/user.schema';
import { Brand } from '../trademarks/trademark.schema';
import { Url } from '../url/url.schema';

export type CompanyDocument = Company & Document;

@Schema()
export class Company {
  @Prop({ required: true })
  companyName: string;

  @Prop({ required: true })
  companyWebsite: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  users: User[]; // A company can have many users

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Trademark' }] })
  brands: Brand[]; // A company can own many trademarks (brands)

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Url' }] })
  urls: Url[]; // A company can have many urls
}

export const CompanySchema = SchemaFactory.createForClass(Company);
