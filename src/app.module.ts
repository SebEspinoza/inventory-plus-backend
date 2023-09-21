import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './users/user.module';
import { ProductModule } from './products/product.module';
import { ReportModule } from './reports/report.module';
import { LogProductModule } from './logProducts/logProduct.module';

@Module({
  imports: [ConfigModule.forRoot(), MongooseModule.forRoot(process.env.MONGO_URI), ProductModule, UserModule, ReportModule, LogProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
