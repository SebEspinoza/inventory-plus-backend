import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './users/user.module';
import { ProductModule } from './products/product.module';
import { LogProductMorningModule } from './logProducts/logProduct.module';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { LogProductEveningModule } from './logProductsEvening/logProductEvening.module';
import { MlModule } from './inventorypredictions/ml.module';
require('dotenv').config();

@Module({
  imports: [ConfigModule.forRoot(), MongooseModule.forRoot(process.env.MONGO_URI), ProductModule, UserModule, LogProductMorningModule, LogProductEveningModule, AuthModule, ScheduleModule.forRoot(), MlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
