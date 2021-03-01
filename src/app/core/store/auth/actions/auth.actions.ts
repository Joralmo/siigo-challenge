/* Ngrx */
import { props, createAction } from '@ngrx/store';

/* Models */
import { Credentials } from '@core/models/credentials.model';

const AuthActionsTypes = {
  SIGN_IN: '[AUTH] SIGN IN',
  SIGN_IN_SUCCESS: '[AUTH] SIGN IN SUCCESS',
  SIGN_IN_FAILURE: '[AUTH] SIGN IN FAILURE',
};

export const signIn = createAction(
  AuthActionsTypes.SIGN_IN,
  props<{ credentials: Credentials }>(),
);

export const signInSuccess = createAction(
  AuthActionsTypes.SIGN_IN_SUCCESS,
  props<{ access_token: string }>(),
);

export const signInFailure = createAction(
  AuthActionsTypes.SIGN_IN_FAILURE,
  props<{ error: string }>(),
);
