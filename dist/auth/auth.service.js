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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../users/user.schema");
let AuthService = class AuthService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async register(userData) {
        if (!userData.email || !userData.password) {
            throw new common_1.BadRequestException('Email and password are required');
        }
        try {
            const existingUser = await this.userModel.findOne({ email: userData.email });
            if (existingUser) {
                throw new common_1.BadRequestException('Email is already registered');
            }
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            const user = new this.userModel({
                ...userData,
                password: hashedPassword,
            });
            await user.save();
            const payload = { email: user.email, sub: user._id };
            const token = this.jwtService.sign(payload);
            return { user, accessToken: token };
        }
        catch (error) {
            console.error('Error registering user:', error);
            throw new common_1.InternalServerErrorException('Failed to register user');
        }
    }
    async login(email, password) {
        try {
            const user = await this.userModel.findOne({ email });
            if (!user || !(await bcrypt.compare(password, user.password))) {
                throw new common_1.UnauthorizedException('Invalid email or password');
            }
            const payload = { email: user.email, sub: user._id };
            const token = this.jwtService.sign(payload);
            return { accessToken: token };
        }
        catch (error) {
            console.error('Error during login:', error);
            if (error instanceof common_1.UnauthorizedException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Failed to log in');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map