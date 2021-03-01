import { environment } from '@env/environment';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from '@core/store/reducers/app.reducers';
import { first, mergeMap } from 'rxjs/operators';
import { selectAuthToken } from '@core/store/auth/selectors/auth.selectors';
import { of } from 'rxjs';

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {
  private openEndpoints: string[] = ['sign-in'];

  constructor(private store$: Store<AppState>) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    if (environment.enableCross && !request.url.includes('/assets/i18n/')) {
      request = request.clone({
        url: `${environment.crossOriginApi}/${request.url}`,
      });
    }

    if (!this.openEndpoints.includes(request.url)) {
      return this.addToken(request).pipe(
        first(),
        mergeMap((requestWithToken: HttpRequest<any>) =>
          next.handle(requestWithToken),
        ),
      );
    }

    return next.handle(request);
  }

  /**
   * Add the JWT token to the request header.
   */
  private addToken(request: HttpRequest<any>): Observable<HttpRequest<any>> {
    return this.store$.pipe(
      select(selectAuthToken),
      first(),
      mergeMap((token: string) => {
        if (token) {
          request = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${token}`),
          });
        } else {
          console.warn(`Invalid token!`);
        }
        return of(request);
      }),
    );
  }
}
