import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { CONFIG } from '../config';
import { User } from 'src/models';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    const isAuthenticated =
      type === 'Bearer'
        ? await this.isBearerTokenValid(request, token)
        : this.isAPIKeyValid(request);

    if (!isAuthenticated) throw new UnauthorizedException();
    return true;
  }

  async isBearerTokenValid(request: Request, token: string) {
    const payload = await this.jwtService.verifyAsync<User>(token, {
      secret: CONFIG.JWT_SECRET,
    });
    if (!payload) return false;
    request['user'] = payload;
    return true;
  }

  isAPIKeyValid(request: Request) {
    return request.headers.authorization === CONFIG.API_TOKEN;
  }
}
