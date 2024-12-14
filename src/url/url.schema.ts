import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/user.schema';

export type UrlDocument = Url & Document;

// Definimos la clase UrlSchema como un documento de MongoDB
@Schema()
export class Url {
  @Prop()
  fullUrl: string;

  @Prop()
  tinyUrl: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  owner: User; // Reference to the User
}

// Creamos el schema a partir de la clase Url
export const UrlSchema = SchemaFactory.createForClass(Url);
