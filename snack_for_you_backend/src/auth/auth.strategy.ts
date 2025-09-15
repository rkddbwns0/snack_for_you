import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    return {
      user_id: payload.user_id || payload.admin_id,
      id: payload.id,
      name: payload.name,
      role: payload.role,
      ...(payload.nickname && { nickname: payload.nickname }),
    };
  }
}
