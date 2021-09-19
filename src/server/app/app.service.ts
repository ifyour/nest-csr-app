import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string[] {
    return ['Hello', 'Word!', 'Nest.js + Umi.js 😃'];
  }
}
