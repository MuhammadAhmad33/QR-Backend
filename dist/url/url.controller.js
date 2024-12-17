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
exports.UrlController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const url_service_1 = require("./url.service");
const get_user_decorator_1 = require("../auth/get-user.decorator");
const user_service_1 = require("../users/user.service");
let UrlController = class UrlController {
    constructor(urlService, userService) {
        this.urlService = urlService;
        this.userService = userService;
    }
    async getUrls(user) {
        const company = await this.userService.getCompanyByUser(user.userId);
        return this.urlService.getUrls(company['_id'].toString());
    }
    async getUrlById(id) {
        return this.urlService.getUrlByTinyUrl(id);
    }
    async createUrl(data, user) {
        if (!data.fullUrl.startsWith('https://') && !data.fullUrl.startsWith('http://')) {
            data.fullUrl = `https://${data.fullUrl}`;
        }
        const tiny = this.urlService.generateTinyUrl();
        data.tinyUrl = `https://qr-sass-frontend.vercel.app/label/${tiny}`;
        data.tiny = tiny;
        const owner = await this.userService.getCompanyByUser(user.userId);
        return this.urlService.createUrl({ ...data, owner: owner['_id'].toString() });
    }
    async updateUrl(id, data) {
        return this.urlService.updateUrl(id, data);
    }
    async deleteUrl(id) {
        return this.urlService.deleteUrl(id);
    }
};
exports.UrlController = UrlController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UrlController.prototype, "getUrls", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UrlController.prototype, "getUrlById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UrlController.prototype, "createUrl", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UrlController.prototype, "updateUrl", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UrlController.prototype, "deleteUrl", null);
exports.UrlController = UrlController = __decorate([
    (0, common_1.Controller)('url'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [url_service_1.UrlService,
        user_service_1.UserService])
], UrlController);
//# sourceMappingURL=url.controller.js.map