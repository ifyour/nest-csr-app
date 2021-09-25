import { Controller, Request, Post, UseGuards, Get, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { RequestWithUser } from './requestWithUser.interface';
import { UsersService } from '../users/users.service';
import { JwtRefreshGuard } from './jwt-refresh.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() request: RequestWithUser) {
    const { user } = request;
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(user.id, user.username);
    const {
      token: refreshToken,
      cookie: refreshTokenCookie
    } = this.authService.getCookieWithJwtRefreshToken(user.id, user.username);
    await this.userService.setCurrentRefreshToken(user.id, refreshToken);
    request.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);
    return user;
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  @UseInterceptors(ClassSerializerInterceptor)
  async refresh(@Request() request: RequestWithUser) {
    const { user } = request;
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(user.id, user.username);
    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async getProfile(@Request() request: RequestWithUser) {
    const { user } = request;
    await this.userService.removeRefreshToken(user.id);
    const cookie = this.authService.getCookieForLogout();
    request.res.setHeader('Set-Cookie', cookie);
  }

}
