"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrademarkModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const trademark_schema_1 = require("./trademark.schema");
const trademark_service_1 = require("./trademark.service");
const trademark_controller_1 = require("./trademark.controller");
let TrademarkModule = class TrademarkModule {
};
exports.TrademarkModule = TrademarkModule;
exports.TrademarkModule = TrademarkModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: trademark_schema_1.Brand.name, schema: trademark_schema_1.BrandSchema }]),
        ],
        providers: [trademark_service_1.TrademarkService],
        controllers: [trademark_controller_1.TrademarkController],
    })
], TrademarkModule);
//# sourceMappingURL=trademark.module.js.map