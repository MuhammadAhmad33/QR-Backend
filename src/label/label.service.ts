import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Label, LabelDocument } from './label.schema';
import { CloudinaryService } from '../utils/cloudinary.service';

@Injectable()
export class LabelService {
  constructor(
    @InjectModel(Label.name) private labelModel: Model<LabelDocument>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(createLabelDto: { 
    name: string; 
    description: string; 
    brand: string; 
    ingredients: string[];
    nutritionDeclaration: { name: string; value: string }[];
    imageBuffer?: Buffer | null; 
    imageOriginalname?: string | null;
  }): Promise<Label> {
    if (!Types.ObjectId.isValid(createLabelDto.brand)) {
      throw new NotFoundException('Invalid brand ID');
    }
  
    let imageUrl = null;
    if (createLabelDto.imageBuffer && createLabelDto.imageOriginalname) {
      const uploadedImage = await this.cloudinaryService.uploadImage(
        createLabelDto.imageBuffer, 
        createLabelDto.imageOriginalname
      );
      imageUrl = uploadedImage.secure_url;
    }
  
    const createdLabel = new this.labelModel({
      ...createLabelDto,
      brand: new Types.ObjectId(createLabelDto.brand),
      image: imageUrl, // Set image to null if not uploaded
    });
    return createdLabel.save();
  }
  

  async findAll(): Promise<Label[]> {
    return this.labelModel.find(
      { deletedAt: null }, 
    ).populate('brand').exec();
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
    updateLabelDto: { 
      name?: string; 
      description?: string; 
      brand?: string; 
      ingredients?: string[];
      nutritionDeclaration?: { name: string; value: string }[];
    },
    image?: Express.Multer.File
  ): Promise<Label> {
    if (updateLabelDto.brand && !Types.ObjectId.isValid(updateLabelDto.brand)) {
      throw new NotFoundException('Invalid brand ID');
    }

    let imageUrl;
    if (image) {
      const uploadedImage = await this.cloudinaryService.uploadImage(image.buffer, image.originalname);
      imageUrl = uploadedImage.secure_url;
    }

    const updatedLabel = await this.labelModel
      .findByIdAndUpdate(
        id,
        {
          ...updateLabelDto,
          ...(updateLabelDto.brand && { brand: new Types.ObjectId(updateLabelDto.brand) }),
          ...(imageUrl && { image: imageUrl }),
        },
        { new: true }
      )
      .populate('brand');

    if (!updatedLabel) {
      throw new NotFoundException(`Label with ID ${id} not found`);
    }
    return updatedLabel;
  }

  async remove(id: string): Promise<Label> {
    const deletedLabel = await this.labelModel.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },  // Soft delete
      { new: true }
    );
  
    if (!deletedLabel) {
      throw new NotFoundException(`Label with ID ${id} not found`);
    }
  
    return deletedLabel;
  }

  async restore(id: string): Promise<Label> {
    const restoredLabel = await this.labelModel.findByIdAndUpdate(
      id,
      { deletedAt: null }, // Restore label
      { new: true }
    );
  
    if (!restoredLabel) {
      throw new NotFoundException(`Label with ID ${id} not found or not deleted`);
    }
  
    return restoredLabel;
  }
  
  

  async findByBrand(brandId: string): Promise<Label[]> {
    if (!Types.ObjectId.isValid(brandId)) {
      throw new NotFoundException('Invalid brand ID');
    }

    const labels = await this.labelModel.find({ brand: new Types.ObjectId(brandId),deletedAt: null }).populate('brand').exec();

    if (!labels || labels.length === 0) {
      throw new NotFoundException(`No labels found for brand with ID ${brandId}`);
    }

    return labels;
  }

  async findDeletedByBrand(brandId: string): Promise<Label[]> {
    if (!Types.ObjectId.isValid(brandId)) {
      throw new NotFoundException('Invalid brand ID');
    }
  
    const deletedLabels = await this.labelModel
      .find({ brand: new Types.ObjectId(brandId), deletedAt: { $ne: null } })
      .populate('brand')
      .exec();
  
    if (!deletedLabels || deletedLabels.length === 0) {
      throw new NotFoundException(`No soft-deleted labels found for brand with ID ${brandId}`);
    }
  
    return deletedLabels;
  }
  
  
}
