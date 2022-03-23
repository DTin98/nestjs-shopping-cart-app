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
        console.log("🚀 ~ file: transform.interceptor.ts ~ line 13 ~ TransformInterceptor<T> ~ intercept ~ context.switchToHttp().getResponse()", context.switchToHttp().getResponse())
        return next.handle().pipe(map(data => ({ statusCode: statusCode, data: data })));
    }
}