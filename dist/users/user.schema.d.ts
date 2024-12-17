import { Document, Types } from 'mongoose';
import { Company } from '../company/company.schema';
export type UserDocument = User & Document;
export declare class User {
    name: string;
    email: string;
    password: string;
    isOwner: boolean;
    isActive: boolean;
    createdAt: Date;
    company: Company;
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
