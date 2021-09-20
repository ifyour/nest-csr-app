import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { HelloModule } from './api/hello/hello.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'src/client/dist'),
    }),
    HelloModule,
  ],
})
export class AppModule { }
