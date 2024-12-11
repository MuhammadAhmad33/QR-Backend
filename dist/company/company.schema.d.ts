import { Document, Types } from 'mongoose';
import { User } from '../users/user.schema';
import { Brand } from '../trademarks/trademark.schema';
export type CompanyDocument = Company & Document;
export declare class Company {
    companyName: string;
    companyWebsite: string;
    users: User[];
    brands: Brand[];
}
export declare const CompanySchema: import("mongoose").Schema<Company, import("mongoose").Model<Company, any, any, any, Document<unknown, any, Company> & Company & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Company, Document<unknown, {}, import("mongoose").FlatRecord<Company>> & import("mongoose").FlatRecord<Company> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
