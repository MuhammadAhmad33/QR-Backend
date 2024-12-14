import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Url, UrlDocument } from './url.schema';
import { Model } from 'mongoose';

@Injectable()
export class UrlService {
    constructor(
        @InjectModel(Url.name) private urlModel: Model<UrlDocument>,
    ) {}

    getUrls(companyId: string) {
        return this.urlModel.find({ owner: companyId });
    }

    createUrl(data: { fullUrl: string; tinyUrl: string, owner: string }) {
        const url = new this.urlModel(data);
        return url.save();
    }

    getUrlById(id: string) {
        return this.urlModel.findById(id);
    }

    updateUrl(id: string, data: Partial<{ fullUrl: string; tinyUrl: string }>) {
        return this.urlModel.findByIdAndUpdate(id, data, { new: true });
    }

    deleteUrl(id: string) {
        return this.urlModel.findByIdAndDelete(id);
    }
}
