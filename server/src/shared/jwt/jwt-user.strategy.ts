import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { configService } from '../config/config.service';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class JwtUserStrategy extends PassportStrategy(Strategy, 'jwt-user') {
  private readonly logger: Logger;

  constructor(private readonly authService: AuthService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: configService.adminCognito.jwksUri,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: configService.adminCognito.clientId,
      issuer: configService.adminCognito.issuer,
      algorithms: ['RS256'],
    });
    this.logger = new Logger(JwtUserStrategy.name);
  }

  public async validate(payload: { sub: string }) {
    try {
      return this.authService.validateUser(payload.sub);
    } catch (e) {
      this.logger.error(e);
      throw new UnauthorizedException();
    }
  }
}
