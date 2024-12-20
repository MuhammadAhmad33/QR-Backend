import { Document } from 'mongoose';
import { Types } from 'mongoose';
import { Brand } from '../trademarks/trademark.schema';
export type LabelDocument = Label & Document;
export declare class Label {
    name: string;
    description: string;
    image: string;
    brand: Brand;
}
export declare const LabelSchema: import("mongoose").Schema<Label, import("mongoose").Model<Label, any, any, any, Document<unknown, any, Label> & Label & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Label, Document<unknown, {}, import("mongoose").FlatRecord<Label>> & import("mongoose").FlatRecord<Label> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
