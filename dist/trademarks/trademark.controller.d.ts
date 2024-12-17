import { TrademarkService } from './trademark.service';
import { UserService } from 'src/users/user.service';
export declare class TrademarkController {
    private trademarkService;
    private userService;
    constructor(trademarkService: TrademarkService, userService: UserService);
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
