import { Module } from '@nestjs/common';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Url, UrlSchema } from './url.schema';
import { UserModule } from 'src/users/user.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Url.name, schema: UrlSchema }]), UserModule],
  controllers: [UrlController],
  providers: [UrlService]
})
export class UrlModule {}
