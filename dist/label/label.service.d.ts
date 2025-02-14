import { Model } from 'mongoose';
import { Label, LabelDocument } from './label.schema';
import { CloudinaryService } from '../utils/cloudinary.service';
export declare class LabelService {
    private labelModel;
    private readonly cloudinaryService;
    constructor(labelModel: Model<LabelDocument>, cloudinaryService: CloudinaryService);
    create(createLabelDto: {
        name: string;
        description: string;
        brand: string;
        ingredients: string[];
        nutritionDeclaration: {
            name: string;
            value: string;
        }[];
        imageBuffer?: Buffer | null;
        imageOriginalname?: string | null;
    }): Promise<Label>;
    findAll(): Promise<Label[]>;
    findOne(id: string): Promise<Label>;
    update(id: string, updateLabelDto: {
        name?: string;
        description?: string;
        brand?: string;
        ingredients?: string[];
        nutritionDeclaration?: {
            name: string;
            value: string;
        }[];
    }, image?: Express.Multer.File): Promise<Label>;
    remove(id: string): Promise<Label>;
    findByBrand(brandId: string): Promise<Label[]>;
}
