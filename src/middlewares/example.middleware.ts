import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, NextFunction } from 'express';

export interface Response<T> {
  statusCode: number;
  data: T;
}

@Injectable()
export class ExampleMiddleware<T> implements NestMiddleware {
  use(req: Request, res: Response<T>, next: NextFunction) {
    next();
  }
}
