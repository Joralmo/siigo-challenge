/* Ngrx */
import { createSelector, createFeatureSelector } from '@ngrx/store';

/* Reducers */
import {
  ClientAppState,
  ClientState,
  clientFeatureKey,
} from '../reducers/client.reducer';

export const selectClientsState = createFeatureSelector<
  ClientAppState,
  ClientState
>(clientFeatureKey);

export const selectClientsPending = createSelector(
  selectClientsState,
  (state: ClientState) => state.loading,
);
