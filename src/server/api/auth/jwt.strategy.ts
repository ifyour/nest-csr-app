import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstant } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstant.secret,
    })
  }

  async validate(payload: any) {
    console.log('%c [ payload ]', 'font-size:13px; background:red; color:white;', payload)
    // 这里可以查数据库，从而在我们的 Request 中得到一个更丰富的用户对象
    return { id: payload.sub, username: payload.username };
  }
}