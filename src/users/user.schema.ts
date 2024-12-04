import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';
import { Brand} from '../trademarks/trademark.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  companyName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  companyWebsite: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Trademark' }] })
  brands: Brand[]; // A user can have many trademarks (brands)
}

export const UserSchema = SchemaFactory.createForClass(User);
