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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabelSchema = exports.Label = exports.NutritionElement = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const trademark_schema_1 = require("../trademarks/trademark.schema");
let NutritionElement = class NutritionElement {
};
exports.NutritionElement = NutritionElement;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], NutritionElement.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], NutritionElement.prototype, "value", void 0);
exports.NutritionElement = NutritionElement = __decorate([
    (0, mongoose_1.Schema)()
], NutritionElement);
const NutritionElementSchema = mongoose_1.SchemaFactory.createForClass(NutritionElement);
let Label = class Label {
};
exports.Label = Label;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Label.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Label.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Label.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Brand', required: true }),
    __metadata("design:type", trademark_schema_1.Brand)
], Label.prototype, "brand", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], required: false }),
    __metadata("design:type", Array)
], Label.prototype, "ingredients", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [NutritionElementSchema], required: true }),
    __metadata("design:type", Array)
], Label.prototype, "nutritionDeclaration", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", Date)
], Label.prototype, "deletedAt", void 0);
exports.Label = Label = __decorate([
    (0, mongoose_1.Schema)()
], Label);
exports.LabelSchema = mongoose_1.SchemaFactory.createForClass(Label);
//# sourceMappingURL=label.schema.js.map