import { Controller, Post, Body } from '@nestjs/common';
import { MlService } from './ml.service';

@Controller('predictions')
export class MlController {
  constructor(private readonly predictionService: MlService) { }

  @Post('/predict-stock')
  async predictStock(@Body() body: { cantidad: number; mes: string }): Promise<number> {
    const { cantidad, mes } = body;
    return this.predictionService.predict(cantidad, mes);
  }
}