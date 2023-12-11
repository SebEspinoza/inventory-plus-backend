import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogProductController } from './logProductEvening.controller';
import { LogProductService } from './logProductEvening.service';
import { LogProductEvening, LogProductEveningSchema } from '../schemas/logProductEvening.schema';
import { ScheduleModule } from '@nestjs/schedule';
import { ProductModule } from 'src/products/product.module';


@Module({
    imports: [ScheduleModule.forRoot(), MongooseModule.forFeature([{ name: LogProductEvening.name, schema: LogProductEveningSchema }]), ProductModule],
    controllers: [LogProductController],
    providers: [LogProductService],
})
export class LogProductEveningModule { }