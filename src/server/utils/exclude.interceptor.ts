import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { classToPlain } from 'class-transformer';

/**
 * 排除使用 @Exclude() 装饰的实体字段
 * @ref：https://stackoverflow.com/a/50372391/7056400
 */
@Injectable()
export class ExcludeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    return next.handle().pipe(map(data => classToPlain(data)));
  }
}
