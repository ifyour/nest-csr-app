import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  create() {
    return 'This action adds a new auth';
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }
}
