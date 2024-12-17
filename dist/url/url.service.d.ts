import { Url, UrlDocument } from './url.schema';
import { Model } from 'mongoose';
export declare class UrlService {
    private urlModel;
    constructor(urlModel: Model<UrlDocument>);
    getUrls(companyId: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, UrlDocument> & Url & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, UrlDocument> & Url & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, {}, UrlDocument, "find", {}>;
    createUrl(data: {
        fullUrl: string;
        tinyUrl: string;
        owner: string;
    }): Promise<import("mongoose").Document<unknown, {}, UrlDocument> & Url & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getUrlByTinyUrl(tiny: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, UrlDocument> & Url & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, import("mongoose").Document<unknown, {}, UrlDocument> & Url & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, {}, UrlDocument, "findOne", {}>;
    getUrlById(id: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, UrlDocument> & Url & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, import("mongoose").Document<unknown, {}, UrlDocument> & Url & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, {}, UrlDocument, "findOne", {}>;
    updateUrl(id: string, data: Partial<{
        fullUrl: string;
        tinyUrl: string;
    }>): import("mongoose").Query<import("mongoose").Document<unknown, {}, UrlDocument> & Url & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, import("mongoose").Document<unknown, {}, UrlDocument> & Url & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, {}, UrlDocument, "findOneAndUpdate", {}>;
    deleteUrl(id: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, UrlDocument> & Url & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, import("mongoose").Document<unknown, {}, UrlDocument> & Url & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, {}, UrlDocument, "findOneAndDelete", {}>;
    generateTinyUrl(): string;
}
