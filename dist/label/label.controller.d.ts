import { LabelService } from './label.service';
import { Label } from './label.schema';
export declare class LabelController {
    private readonly labelService;
    constructor(labelService: LabelService);
    create(createLabelDto: any, image: Express.Multer.File): Promise<Label>;
    findAll(): Promise<Label[]>;
    findOne(id: string): Promise<Label>;
    update(id: string, updateLabelDto: any, image: Express.Multer.File): Promise<Label>;
    remove(id: string): Promise<Label>;
    findByBrand(brandId: string): Promise<Label[]>;
}
