/* Ngrx */
import { createSelector, createFeatureSelector } from '@ngrx/store';

/* Reducers */
import {
  AuthAppState,
  AuthState,
  authFeatureKey,
} from '../reducers/auth.reducer';

export const selectAuthsState = createFeatureSelector<AuthAppState, AuthState>(
  authFeatureKey,
);

export const selectAuthToken = createSelector(
  selectAuthsState,
  (state: AuthState) => state.access_token,
);
