import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express-serve-static-core';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const ctx = context.switchToHttp();
        const request: Request = ctx.getRequest()
        console.log('Endpoint: ', request.url)
        console.log('Method: ', request.method)
        const now = Date.now();
        return next
            .handle()
            .pipe(
                tap(() => {
                    console.log(`Execution time: ${Date.now() - now}ms`)
                }),
            );
    }
}
