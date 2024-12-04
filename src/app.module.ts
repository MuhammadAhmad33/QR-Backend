import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { TrademarkModule } from './trademarks/trademark.module';
import { UserModule } from './users/user.module';
import * as dotenv from 'dotenv'; // Load dotenv here as well, if necessary

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI), // Update with your MongoDB connection string
    AuthModule,
    UserModule,
    TrademarkModule,
  ],
})
export class AppModule {}

