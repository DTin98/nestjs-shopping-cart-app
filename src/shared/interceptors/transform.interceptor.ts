import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
    data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
        const statusCode = context.switchToHttp().getResponse().statusCode;
        console.log(JSON.stringify({statusCode: statusCode, data: context.switchToHttp().getRequest().data}, null, 4));
        return next.handle().pipe(map(data => ({ statusCode: statusCode, data: data })));
    }
}
