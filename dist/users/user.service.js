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
    async getUsers(userId) {
        const user = await this.userModel.findById(userId).populate('company').exec();
        if (!user || !user.company) {
            throw new Error('User or company not found');
        }
        const companyId = user.company['_id'].toString();
        return this.userModel.find({ company: companyId }).exec();
    }
    async getCompanyByUser(userId) {
        const user = await this.userModel.findById(userId).populate('company').exec();
        if (!user) {
            throw new Error('User not found');
        }
        if (!user.company) {
            throw new Error('User does not belong to any company');
        }
        return user.company;
    }
    async updateUser(currentUserId, userId, updateData) {
        const currentUser = await this.userModel.findById(currentUserId).populate('company').exec();
        const targetUser = await this.userModel.findById(userId).populate('company').exec();
        if (!currentUser || !targetUser) {
            throw new Error('Current user or target user not found');
        }
        if (currentUser.company['_id'].toString() !== targetUser.company['_id'].toString()) {
            throw new Error('You do not have permission to update this user');
        }
        return this.userModel.findByIdAndUpdate(userId, updateData, { new: true }).exec();
    }
    async deleteUser(currentUserId, userId) {
        const currentUser = await this.userModel.findById(currentUserId).populate('company').exec();
        const targetUser = await this.userModel.findById(userId).populate('company').exec();
        if (!currentUser || !targetUser) {
            throw new Error('Current user or target user not found');
        }
        if (currentUser.company['_id'].toString() !== targetUser.company['_id'].toString()) {
            throw new Error('You do not have permission to delete this user');
        }
        await this.userModel.findByIdAndDelete(userId).exec();
        await this.companyModel.findByIdAndUpdate(targetUser.company['_id'], { $pull: { users: targetUser._id } }, { new: true });
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