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
exports.CompanyService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const company_schema_1 = require("./company.schema");
let CompanyService = class CompanyService {
    constructor(companyModel) {
        this.companyModel = companyModel;
    }
    async createCompany(companyData) {
        const company = new this.companyModel(companyData);
        return company.save();
    }
    async addUserToCompany(companyId, userId) {
        return this.companyModel.findByIdAndUpdate(companyId, { $push: { users: new mongoose_2.Types.ObjectId(userId) } }, { new: true }).populate('users');
    }
    async addBrandToCompany(companyId, brandId) {
        return this.companyModel.findByIdAndUpdate(companyId, { $push: { brands: new mongoose_2.Types.ObjectId(brandId) } }, { new: true }).populate('brands');
    }
    async findCompanyByEmail(email) {
        return this.companyModel.findOne({ email }).populate(['users', 'brands']).exec();
    }
    async getUsersOfCompany(companyId) {
        const company = await this.companyModel.findById(companyId).populate({
            path: 'users',
            model: 'User',
        });
        if (!company) {
            throw new Error('Company not found');
        }
        return company.users;
    }
};
exports.CompanyService = CompanyService;
exports.CompanyService = CompanyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(company_schema_1.Company.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CompanyService);
//# sourceMappingURL=company.service.js.map