import { Injectable } from '@angular/core';

/* Ngrx */
import { Actions, createEffect, ofType } from '@ngrx/effects';

/* Services  */
import { AuthService } from '@core/services/auth.service';

/* Rxjs */
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

/* Actions */
import { AuthActions } from '../actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signIn),
      mergeMap(({ credentials }) =>
        this.authService.signIn(credentials).pipe(
          map(({ access_token }) =>
            AuthActions.signInSuccess({ access_token }),
          ),
          catchError(error => of(AuthActions.signInFailure({ error }))),
        ),
      ),
    ),
  );
}
