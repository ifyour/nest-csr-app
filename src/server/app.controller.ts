import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { LocalAuthGuard } from './api/auth/local-auth.guard';
import { JwtAuthGuard } from './api/auth/jwt-auth.guard';
import { AuthService } from './api/auth/auth.service';

@Controller()
export class AppController {
  // TypeScript 构造函数，类型定义短语法，参考链接：
  // https://dev.to/satansdeer/typescript-constructor-shorthand-3ibd
  constructor(private authService: AuthService) { }

  // 守卫验证通过后，才会进入进入到 controller 中
  // 比如这里的场景是，比对数据库用户名、密码正确后，开始签署 access_token 给用户
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
