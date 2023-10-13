import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogProductController } from './logProduct.controller';
import { LogProductService } from './logProduct.service';
import { LogProduct, LogProductSchema } from '../schemas/logProduct.schema';
import { ScheduleModule } from '@nestjs/schedule';
import { ProductModule } from 'src/products/product.module';


@Module({
    imports: [ScheduleModule.forRoot(), MongooseModule.forFeature([{ name: LogProduct.name, schema: LogProductSchema }]), ProductModule],
    controllers: [LogProductController],
    providers: [LogProductService],
})
export class LogProductModule { }