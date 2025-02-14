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
exports.LabelService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const label_schema_1 = require("./label.schema");
const cloudinary_service_1 = require("../utils/cloudinary.service");
let LabelService = class LabelService {
    constructor(labelModel, cloudinaryService) {
        this.labelModel = labelModel;
        this.cloudinaryService = cloudinaryService;
    }
    async create(createLabelDto) {
        if (!mongoose_2.Types.ObjectId.isValid(createLabelDto.brand)) {
            throw new common_1.NotFoundException('Invalid brand ID');
        }
        let imageUrl = null;
        if (createLabelDto.imageBuffer && createLabelDto.imageOriginalname) {
            const uploadedImage = await this.cloudinaryService.uploadImage(createLabelDto.imageBuffer, createLabelDto.imageOriginalname);
            imageUrl = uploadedImage.secure_url;
        }
        const createdLabel = new this.labelModel({
            ...createLabelDto,
            brand: new mongoose_2.Types.ObjectId(createLabelDto.brand),
            image: imageUrl,
        });
        return createdLabel.save();
    }
    async findAll() {
        return this.labelModel.find().populate('brand').exec();
    }
    async findOne(id) {
        const label = await this.labelModel.findById(id).populate('brand').exec();
        if (!label) {
            throw new common_1.NotFoundException(`Label with ID ${id} not found`);
        }
        return label;
    }
    async update(id, updateLabelDto, image) {
        if (updateLabelDto.brand && !mongoose_2.Types.ObjectId.isValid(updateLabelDto.brand)) {
            throw new common_1.NotFoundException('Invalid brand ID');
        }
        let imageUrl;
        if (image) {
            const uploadedImage = await this.cloudinaryService.uploadImage(image.buffer, image.originalname);
            imageUrl = uploadedImage.secure_url;
        }
        const updatedLabel = await this.labelModel
            .findByIdAndUpdate(id, {
            ...updateLabelDto,
            ...(updateLabelDto.brand && { brand: new mongoose_2.Types.ObjectId(updateLabelDto.brand) }),
            ...(imageUrl && { image: imageUrl }),
        }, { new: true })
            .populate('brand');
        if (!updatedLabel) {
            throw new common_1.NotFoundException(`Label with ID ${id} not found`);
        }
        return updatedLabel;
    }
    async remove(id) {
        const deletedLabel = await this.labelModel.findByIdAndDelete(id);
        if (!deletedLabel) {
            throw new common_1.NotFoundException(`Label with ID ${id} not found`);
        }
        return deletedLabel;
    }
    async findByBrand(brandId) {
        if (!mongoose_2.Types.ObjectId.isValid(brandId)) {
            throw new common_1.NotFoundException('Invalid brand ID');
        }
        const labels = await this.labelModel.find({ brand: new mongoose_2.Types.ObjectId(brandId) }).populate('brand').exec();
        if (!labels || labels.length === 0) {
            throw new common_1.NotFoundException(`No labels found for brand with ID ${brandId}`);
        }
        return labels;
    }
};
exports.LabelService = LabelService;
exports.LabelService = LabelService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(label_schema_1.Label.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        cloudinary_service_1.CloudinaryService])
], LabelService);
//# sourceMappingURL=label.service.js.map