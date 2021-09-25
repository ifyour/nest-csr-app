import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './tokenPayload.interface'

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) { }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneIncludePassword(username);
    if (user && user.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: { id: number, username: string, isActive: boolean }) {
    const payload = { username: user.username, userId: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  getCookieWithJwtAccessToken(userId: number, username: string) {
    const payload: TokenPayload = { userId, username };
    const expiresTime = this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME');
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: expiresTime,
    });
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${expiresTime}`;
  }

  getCookieWithJwtRefreshToken(userId: number, username: string) {
    const payload: TokenPayload = { userId, username };
    const expiresTime = this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME');
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: expiresTime,
    });
    return {
      token,
      cookie: `Refresh=${token}; HttpOnly; Path=/; Max-Age=${expiresTime}`,
    };
  }

  getCookieForLogout() {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0'
    ];
  }

}
