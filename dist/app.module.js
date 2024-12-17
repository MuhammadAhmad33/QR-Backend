"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("./auth/auth.module");
const trademark_module_1 = require("./trademarks/trademark.module");
const user_module_1 = require("./users/user.module");
const dotenv = require("dotenv");
const company_module_1 = require("./company/company.module");
const url_module_1 = require("./url/url.module");
dotenv.config();
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot(process.env.MONGO_URI),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            trademark_module_1.TrademarkModule,
            company_module_1.CompanyModule,
            url_module_1.UrlModule
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map