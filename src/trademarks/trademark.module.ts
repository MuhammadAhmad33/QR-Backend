import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Brand, BrandSchema } from './trademark.schema';
import { TrademarkService } from './trademark.service';
import { TrademarkController } from './trademark.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Brand.name, schema: BrandSchema }]),
  ],
  providers: [TrademarkService],
  controllers: [TrademarkController],
})
export class TrademarkModule {}
