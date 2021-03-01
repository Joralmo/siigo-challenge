/* Ngrx */
import { createReducer, on, Action } from '@ngrx/store';

/* Actions */
import { AuthActions } from '../actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  loading: boolean;
  access_token: string;
}

export interface AuthAppState extends AuthState {
  [authFeatureKey]: AuthState;
}

export const initialState: AuthState = {
  loading: true,
  access_token: '',
};

const authReducer = createReducer(
  initialState,
  on(AuthActions.signIn, state => ({ ...state, loading: true })),
  on(AuthActions.signInSuccess, (state, { access_token }) => ({
    ...state,
    loading: false,
    access_token,
  })),
  on(AuthActions.signInFailure, state => ({ ...state, loading: false })),
);

export function reducerAuth(state: AuthState, action: Action): any {
  return authReducer(state, action);
}
