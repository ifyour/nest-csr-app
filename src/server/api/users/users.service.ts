import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(username: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async findOneById(userId: number): Promise<User | null> {
    const user = await this.usersRepository.findOne(userId);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
    const user = await this.findOneById(userId);
    const isRefreshTokenMatched = await bcrypt.compare(refreshToken, user.currentHashedRefreshToken);
    if (isRefreshTokenMatched) {
      return user;
    }
  }

  findOneIncludePassword(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { username },
      select: ['id', 'username', 'password', 'isActive'],
    });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async setCurrentRefreshToken(userId: number, refreshToken: string) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.usersRepository.update(userId, { currentHashedRefreshToken });
  }

  async removeRefreshToken(userId: number) {
    await this.usersRepository.update(userId, { currentHashedRefreshToken: null })
  }

}
