import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { AuthService } from './auth/shared/auth.service';
import { switchMap, catchError } from 'rxjs/operators';
import { LoginResponse } from './auth/login/login-response-payload';


@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

    isTokenRefreshing = false;
    refreshTokenSubject = new BehaviorSubject(null);

    constructor(public authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authService.getJwtToken()) {
            this.addToken(req, this.authService.getJwtToken());
        }
        return next.handle(req).pipe(catchError(error => {
            if (error instanceof HttpErrorResponse
                && error.status === 403) {
                return this.handleAuthErrors(req, next);
            } else {
                return throwError(error);
            }
        }));


    }
    handleAuthErrors(req: HttpRequest<any>, next: HttpHandler) {
        if (!this.isTokenRefreshing) {
            this.isTokenRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.authService.refreshToken().pipe(
                switchMap((refreshTokenResponse: LoginResponse) => {
                    this.isTokenRefreshing = false;
                    this.refreshTokenSubject.next(refreshTokenResponse.authenticationToken);
                    return next.handle(this.addToken(req, refreshTokenResponse.authenticationToken));
                })
            )
        }
    }
    addToken(req: HttpRequest<any>, jwtToken: string) {
        return req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + jwtToken)
        });
    }
}