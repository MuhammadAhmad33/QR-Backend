import { Document, Types } from 'mongoose';
import { User } from 'src/users/user.schema';
export type UrlDocument = Url & Document;
export declare class Url {
    fullUrl: string;
    tinyUrl: string;
    owner: User;
}
export declare const UrlSchema: import("mongoose").Schema<Url, import("mongoose").Model<Url, any, any, any, Document<unknown, any, Url> & Url & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Url, Document<unknown, {}, import("mongoose").FlatRecord<Url>> & import("mongoose").FlatRecord<Url> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
