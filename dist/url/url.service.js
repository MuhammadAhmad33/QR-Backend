"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const url_schema_1 = require("./url.schema");
const mongoose_2 = require("mongoose");
const uuid_1 = require("uuid");
let UrlService = class UrlService {
    constructor(urlModel) {
        this.urlModel = urlModel;
    }
    getUrls(companyId) {
        return this.urlModel.find({ owner: companyId });
    }
    createUrl(data) {
        const url = new this.urlModel(data);
        return url.save();
    }
    getUrlByTinyUrl(tiny) {
        return this.urlModel.findOne({ tiny });
    }
    getUrlById(id) {
        return this.urlModel.findById(id);
    }
    updateUrl(id, data) {
        return this.urlModel.findByIdAndUpdate(id, data, { new: true });
    }
    deleteUrl(id) {
        return this.urlModel.findByIdAndDelete(id);
    }
    generateTinyUrl() {
        return (0, uuid_1.v4)();
    }
};
exports.UrlService = UrlService;
exports.UrlService = UrlService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(url_schema_1.Url.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UrlService);
//# sourceMappingURL=url.service.js.map