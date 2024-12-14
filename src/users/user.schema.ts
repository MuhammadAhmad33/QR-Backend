import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Company } from '../company/company.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  isOwner: boolean; // Virtual property, not stored in the database

  @Prop({ default: true })
  isActive: boolean; // Virtual property, not stored in the database

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ type: Types.ObjectId, ref: 'Company', required: true })
  company: Company; // A user belongs to one company
}

export const UserSchema = SchemaFactory.createForClass(User);
