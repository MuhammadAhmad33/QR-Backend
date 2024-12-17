import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LabelController } from './label.controller';
import { LabelService } from './label.service';
import { Label, LabelSchema } from './label.schema';
import { CloudinaryService } from 'src/utils/cloudinary.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Label.name, schema: LabelSchema }])],
  controllers: [LabelController],
  providers: [LabelService,CloudinaryService],
})
export class LabelModule {}
