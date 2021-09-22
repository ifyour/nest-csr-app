import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { ResProps } from '@/server/constant/type';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.username = createUserDto.username;
    // TODO: 后期改为加密方式存储密码
    user.password = createUserDto.password;
    return this.usersRepository.save(user);
  }

  async findAll(): ResProps<User[]> {
    const users = await this.usersRepository.find();
    return {
      stat: true,
      msg: 'done',
      data: users,
    }
  }

  async findOne(username: string): ResProps<User | null> {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (user) {
      return {
        stat: true,
        msg: 'done',
        data: user
      };
    }
    return { stat: false, msg: '未找到该用户', data: null };
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
