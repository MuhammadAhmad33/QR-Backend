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
        image: any;
        brand: string;
    }): Promise<Label>;
    findAll(): Promise<Label[]>;
    findOne(id: string): Promise<Label>;
    update(id: string, updateLabelDto: {
        name?: string;
        description?: string;
        image?: any;
        brand?: string;
    }): Promise<Label>;
    remove(id: string): Promise<Label>;
    findByBrand(brandId: string): Promise<Label[]>;
}
