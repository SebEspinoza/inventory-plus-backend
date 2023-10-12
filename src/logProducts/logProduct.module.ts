import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogProductController } from './logProduct.controller';
import { LogProductService } from './logProduct.service';
import { LogProduct, LogProductSchema } from '../schemas/logProduct.schema';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
    imports: [ScheduleModule.forRoot(), MongooseModule.forFeature([{ name: LogProduct.name, schema: LogProductSchema }])],
    controllers: [LogProductController],
    providers: [LogProductService],
})
export class LogProductModule { }