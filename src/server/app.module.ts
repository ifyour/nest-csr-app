import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { HelloModule } from './api/hello/hello.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './api/users/users.module'
import { AuthModule } from './api/auth/auth.module';
import { AppController } from './app.controller';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../src/client/dist'),
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './src/server/db/database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    HelloModule,
  ],
  controllers: [AppController],
})
export class AppModule { }
