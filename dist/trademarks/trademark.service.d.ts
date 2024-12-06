import { Model } from 'mongoose';
import { Brand, BrandDocument } from './trademark.schema';
export declare class TrademarkService {
    private trademarkModel;
    constructor(trademarkModel: Model<BrandDocument>);
    createTrademark(data: {
        name: string;
        code: string;
        owner: string;
    }): Promise<import("mongoose").Document<unknown, {}, BrandDocument> & Brand & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getTrademarksByCompany(companyId: string): Promise<(import("mongoose").Document<unknown, {}, BrandDocument> & Brand & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getTrademarkById(id: string): Promise<import("mongoose").Document<unknown, {}, BrandDocument> & Brand & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateTrademark(id: string, data: Partial<{
        name: string;
        code: string;
        owner: string;
    }>): Promise<import("mongoose").Document<unknown, {}, BrandDocument> & Brand & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    deleteTrademark(id: string): Promise<import("mongoose").Document<unknown, {}, BrandDocument> & Brand & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
