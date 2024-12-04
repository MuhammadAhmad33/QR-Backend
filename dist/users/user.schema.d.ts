import { Document } from 'mongoose';
import { Types } from 'mongoose';
import { Brand } from '../trademarks/trademark.schema';
export type UserDocument = User & Document;
export declare class User {
    companyName: string;
    email: string;
    password: string;
    companyWebsite: string;
    brands: Brand[];
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User> & User & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
