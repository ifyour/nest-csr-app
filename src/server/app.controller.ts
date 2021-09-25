import { Controller, Request, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from './api/auth/jwt-auth.guard';

@Controller()
export class AppController {

  // 临时路由，用于验证 JwtAuthGuard 是否生效
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

}
