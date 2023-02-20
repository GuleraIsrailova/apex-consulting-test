import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt';
import {IJWTPayload} from "@apex-consulting-test/interfaces";

@Injectable()
export class AccessJwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
      ignoreExpiration: true,
      secretOrKey: configService.get('ACCESS_TOKEN_SECRET')
    })
  }

  async validate({ email }: IJWTPayload) {
    return email;
  }
}
