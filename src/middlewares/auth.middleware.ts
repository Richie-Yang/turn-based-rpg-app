import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, NextFunction } from 'express';

export interface Response<T> {
  statusCode: number;
  data: T;
}

@Injectable()
export class AuthMiddleware<T> implements NestMiddleware {
  use(req: Request, res: Response<T>, next: NextFunction) {
    // const isValidated = req.isAuthenticated();
    // if (!isValidated) throw new HttpException('Unauthorized', 401);
    next();
  }
}
