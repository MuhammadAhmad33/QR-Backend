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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./user.schema");
const company_schema_1 = require("../company/company.schema");
const bcrypt = require("bcryptjs");
let UserService = class UserService {
    constructor(userModel, companyModel) {
        this.userModel = userModel;
        this.companyModel = companyModel;
    }
    async createUser(userData) {
        const company = await this.companyModel.findById(userData.company);
        if (!company) {
            throw new Error('Company not found');
        }
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = new this.userModel({
            ...userData,
            password: hashedPassword,
            company: userData.company,
        });
        const createdUser = await user.save();
        await this.companyModel.findByIdAndUpdate(userData.company, { $push: { users: createdUser._id } }, { new: true });
        return createdUser;
    }
    async findByEmail(email) {
        return this.userModel.findOne({ email }).populate('company').exec();
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(company_schema_1.Company.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map