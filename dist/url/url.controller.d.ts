import { UrlService } from './url.service';
import { UserService } from 'src/users/user.service';
export declare class UrlController {
    private urlService;
    private userService;
    constructor(urlService: UrlService, userService: UserService);
    getUrls(user: any): Promise<(import("mongoose").Document<unknown, {}, import("./url.schema").UrlDocument> & import("./url.schema").Url & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getUrlById(id: string): Promise<import("mongoose").Document<unknown, {}, import("./url.schema").UrlDocument> & import("./url.schema").Url & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    createUrl(data: {
        fullUrl: string;
        tinyUrl: string;
        tiny: string;
    }, user: any): Promise<import("mongoose").Document<unknown, {}, import("./url.schema").UrlDocument> & import("./url.schema").Url & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateUrl(id: string, data: {
        fullUrl: string;
        tinyUrl: string;
    }): Promise<import("mongoose").Document<unknown, {}, import("./url.schema").UrlDocument> & import("./url.schema").Url & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    deleteUrl(id: string): Promise<import("mongoose").Document<unknown, {}, import("./url.schema").UrlDocument> & import("./url.schema").Url & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
