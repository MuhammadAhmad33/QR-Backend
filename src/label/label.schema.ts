// labels/label.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';
import { Brand } from '../trademarks/trademark.schema'; // Adjust the path as needed

export type LabelDocument = Label & Document;

@Schema()
export class Label {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  image: string; // URL of the image stored in Cloudinary

  @Prop({ type: Types.ObjectId, ref: 'Brand', required: true })
  brand: Brand; 
}

export const LabelSchema = SchemaFactory.createForClass(Label);
