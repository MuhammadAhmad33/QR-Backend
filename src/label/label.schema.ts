import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Brand } from '../trademarks/trademark.schema'; // Adjust the path as needed

export type LabelDocument = Label & Document;

@Schema()
export class NutritionElement {
  @Prop({ required: true })
  name: string; // e.g., "Energy", "Fat", "Protein"

  @Prop({ required: true })
  value: string; // e.g., "267 kJ 64 kcal", "0 g"
}

const NutritionElementSchema = SchemaFactory.createForClass(NutritionElement);

@Schema()
export class Label {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: false }) // Image is now optional
  image?: string; // URL of the image stored in Cloudinary

  @Prop({ type: Types.ObjectId, ref: 'Brand', required: true })
  brand: Brand;

  @Prop({ type: [String], required: false }) // Ingredients array
  ingredients: string[];

  @Prop({ type: [NutritionElementSchema], required: true }) // Array of custom nutrition elements
  nutritionDeclaration: NutritionElement[];

  @Prop({ default: null })  // Soft delete field
  deletedAt: Date | null;
}

export const LabelSchema = SchemaFactory.createForClass(Label);
