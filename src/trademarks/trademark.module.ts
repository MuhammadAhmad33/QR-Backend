import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Brand, BrandSchema } from './trademark.schema';
import { TrademarkService } from './trademark.service';
import { TrademarkController } from './trademark.controller';
import { UserService } from 'src/users/user.service';
import { UserModule } from 'src/users/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Brand.name, schema: BrandSchema }]),
    UserModule
  ],
  providers: [TrademarkService],
  controllers: [TrademarkController],
})
export class TrademarkModule {}
