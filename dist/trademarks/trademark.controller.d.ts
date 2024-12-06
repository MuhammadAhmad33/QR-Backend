import { TrademarkService } from './trademark.service';
export declare class TrademarkController {
    private trademarkService;
    constructor(trademarkService: TrademarkService);
    createTrademark(body: {
        name: string;
        code: string;
    }, user: any): Promise<import("mongoose").Document<unknown, {}, import("./trademark.schema").BrandDocument> & import("./trademark.schema").Brand & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getTrademarks(user: any): Promise<(import("mongoose").Document<unknown, {}, import("./trademark.schema").BrandDocument> & import("./trademark.schema").Brand & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getTrademarkById(id: string): Promise<import("mongoose").Document<unknown, {}, import("./trademark.schema").BrandDocument> & import("./trademark.schema").Brand & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateTrademark(id: string, body: Partial<{
        name: string;
        code: string;
    }>): Promise<import("mongoose").Document<unknown, {}, import("./trademark.schema").BrandDocument> & import("./trademark.schema").Brand & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    deleteTrademark(id: string): Promise<import("mongoose").Document<unknown, {}, import("./trademark.schema").BrandDocument> & import("./trademark.schema").Brand & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
