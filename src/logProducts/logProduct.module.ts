import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogProductController } from './logProduct.controller';
import { LogProductService } from './logProduct.service';
import { LogProductMorning, LogProductMorningSchema } from '../schemas/logProductMorning.schema';
import { ScheduleModule } from '@nestjs/schedule';
import { ProductModule } from 'src/products/product.module';


@Module({
    imports: [ScheduleModule.forRoot(), MongooseModule.forFeature([{ name: LogProductMorning.name, schema: LogProductMorningSchema }]), ProductModule],
    controllers: [LogProductController],
    providers: [LogProductService],
})
export class LogProductMorningModule { }