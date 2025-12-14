import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TToken } from '@shared/models';
import { cookieJwtExtractor } from '@utils/cookieJwtExtractor';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    const secret = configService.get<string>('JWT_ACCESS_SECRET');
    if (!secret) {
      throw new Error('JWT_ACCESS_SECRET is not defined');
    }

    console.log('secret ', secret);

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieJwtExtractor]),
      ignoreExpiration: false,
      secretOrKey: secret,
    });

    this.configService = configService;
  }
  private configService: ConfigService;

  async validate(payload: TToken) {
    console.log('user in local', payload);
    return payload;
  }
}
