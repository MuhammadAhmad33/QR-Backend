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
exports.TrademarkService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const trademark_schema_1 = require("./trademark.schema");
let TrademarkService = class TrademarkService {
    constructor(trademarkModel) {
        this.trademarkModel = trademarkModel;
    }
    async createTrademark(data) {
        const trademark = new this.trademarkModel(data);
        return trademark.save();
    }
    async getTrademarksByCompany(companyId) {
        console.log('Company:', companyId);
        return this.trademarkModel.find({ owner: companyId });
    }
    async getTrademarkById(id) {
        return this.trademarkModel.findById(id);
    }
    async updateTrademark(id, data) {
        return this.trademarkModel.findByIdAndUpdate(id, data, { new: true });
    }
    async deleteTrademark(id) {
        return this.trademarkModel.findByIdAndDelete(id);
    }
};
exports.TrademarkService = TrademarkService;
exports.TrademarkService = TrademarkService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(trademark_schema_1.Brand.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TrademarkService);
//# sourceMappingURL=trademark.service.js.map