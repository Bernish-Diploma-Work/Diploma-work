import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtUserAuthGuard extends AuthGuard('jwt-user') {
  handleRequest(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ) {
    if (err || !user) {
      console.error(err);
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    const req = context.switchToHttp().getRequest();
    req.user = user;
    return user;
  }
}
