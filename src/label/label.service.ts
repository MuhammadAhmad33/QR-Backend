// labels/label.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Label, LabelDocument } from './label.schema';
import { CloudinaryService } from '../utils/cloudinary.service'; // Import Cloudinary service

@Injectable()
export class LabelService {
  constructor(
    @InjectModel(Label.name) private labelModel: Model<LabelDocument>,
    private readonly cloudinaryService: CloudinaryService, // Inject Cloudinary service
  ) {}

  async create(createLabelDto: { name: string; description: string; imageBuffer: Buffer; imageOriginalname: string; brand: string }): Promise<Label> {
    if (!Types.ObjectId.isValid(createLabelDto.brand)) {
      throw new NotFoundException('Invalid brand ID');
    }
  
    const uploadedImage = await this.cloudinaryService.uploadImage(createLabelDto.imageBuffer, createLabelDto.imageOriginalname);
  
    const createdLabel = new this.labelModel({
      ...createLabelDto,
      brand: new Types.ObjectId(createLabelDto.brand),
      image: uploadedImage.secure_url, // Store Cloudinary URL
    });
  
    return createdLabel.save();
  }
  

  async findAll(): Promise<Label[]> {
    return this.labelModel.find().populate('brand').exec();
  }

  async findOne(id: string): Promise<Label> {
    const label = await this.labelModel.findById(id).populate('brand').exec();
    if (!label) {
      throw new NotFoundException(`Label with ID ${id} not found`);
    }
    return label;
  }

  async update(
    id: string,
    updateLabelDto: { name?: string; description?: string; image?: any; brand?: string },
  ): Promise<Label> {
    if (updateLabelDto.brand && !Types.ObjectId.isValid(updateLabelDto.brand)) {
      throw new NotFoundException('Invalid brand ID');
    }

    let imageUrl = undefined;
    if (updateLabelDto.image) {
      const uploadedImage = await this.cloudinaryService.uploadImage(updateLabelDto.image.buffer, updateLabelDto.image.originalname);
      imageUrl = uploadedImage.secure_url;
    }

    const updatedLabel = await this.labelModel
      .findByIdAndUpdate(
        id,
        {
          ...updateLabelDto,
          ...(updateLabelDto.brand && { brand: new Types.ObjectId(updateLabelDto.brand) }),
          ...(imageUrl && { image: imageUrl }), // Update image URL if new image provided
        },
        { new: true },
      )
      .populate('brand');

    if (!updatedLabel) {
      throw new NotFoundException(`Label with ID ${id} not found`);
    }
    return updatedLabel;
  }

  async remove(id: string): Promise<Label> {
    const deletedLabel = await this.labelModel.findByIdAndDelete(id);
    if (!deletedLabel) {
      throw new NotFoundException(`Label with ID ${id} not found`);
    }
    return deletedLabel;
  }

  async findByBrand(brandId: string): Promise<Label[]> {
    if (!Types.ObjectId.isValid(brandId)) {
      throw new NotFoundException('Invalid brand ID');
    }

    const labels = await this.labelModel.find({ brand: new Types.ObjectId(brandId) }).populate('brand').exec();
    
    if (!labels || labels.length === 0) {
      throw new NotFoundException(`No labels found for brand with ID ${brandId}`);
    }

    return labels;
  }
  
}
