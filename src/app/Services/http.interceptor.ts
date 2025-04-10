
import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './../Services/Auth.service';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {

    constructor(private service: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(this.addAuthToken(request));
    }

    addAuthToken(request: HttpRequest<any>) {
        const token: any = this.service.getAuthToken();
        if(request.url.includes('uploadfiles')){
            return request.clone({
                setHeaders: {
                    // Authorization: `Bearer ${(token ? token : '')}`,
                    'Content-Type': 'multipart/form-data',
                }
            })
        }else{
            return request.clone({
                setHeaders: {
                    Authorization: `Bearer ${(token ? token : '')}`,
                    'Content-type': 'application/json',
                }
            })
        }
    }
}