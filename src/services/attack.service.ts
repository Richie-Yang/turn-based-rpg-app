import { Injectable } from '@nestjs/common';

@Injectable()
export class AttackService {
  getHello(): string {
    return 'Hello World!';
  }
}
