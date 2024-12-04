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
exports.TrademarkController = void 0;
const common_1 = require("@nestjs/common");
const trademark_service_1 = require("./trademark.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const get_user_decorator_1 = require("../auth/get-user.decorator");
let TrademarkController = class TrademarkController {
    constructor(trademarkService) {
        this.trademarkService = trademarkService;
    }
    async createTrademark(body, user) {
        const owner = user.userId;
        return this.trademarkService.createTrademark({ ...body, owner });
    }
    async getTrademarks(user) {
        const companyId = user.userId;
        return this.trademarkService.getTrademarksByCompany(companyId);
    }
};
exports.TrademarkController = TrademarkController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TrademarkController.prototype, "createTrademark", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TrademarkController.prototype, "getTrademarks", null);
exports.TrademarkController = TrademarkController = __decorate([
    (0, common_1.Controller)('trademarks'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [trademark_service_1.TrademarkService])
], TrademarkController);
//# sourceMappingURL=trademark.controller.js.map