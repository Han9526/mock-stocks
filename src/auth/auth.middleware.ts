import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  // eslint-disable-next-line @typescript-eslint/ban-types
  async use(req: any, res: any, next: Function) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('JWT 토큰을 찾을 수 없습니다!');
    }

    let token: string;
    try {
      token = authHeader.split(' ')[1];
      const payload = await this.jwtService.verify(token);
      req.user = payload;
      next();
    } catch (err) {
      throw new UnauthorizedException(`JWT 토큰이 올바르지 않습니다: ${token}`);
    }
  }
}
