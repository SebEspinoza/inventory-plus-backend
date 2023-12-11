// src/ml/ml.service.ts
import { Injectable } from '@nestjs/common';
import { PythonShell } from 'python-shell';

@Injectable()
export class MlService {
    async predict(cantidad: number, mes: string): Promise<any> {
        const options = {
            mode: 'text' as 'text' | 'json' | 'binary',
            pythonOptions: ['-u'],
            scriptPath: 'src/inventorypredictions',
            args: [cantidad.toString(), mes],
        };

        return new Promise((resolve, reject) => {
            PythonShell.run('predict.py', options).then(messages => {
                const prediction = parseFloat(messages[0]);
                resolve(prediction);
            });
        });
    }
}
