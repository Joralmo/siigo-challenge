/* Ngrx */
import { createSelector, createFeatureSelector } from '@ngrx/store';

/* Reducers */
import {
  ProductAppState,
  ProductState,
  productFeatureKey,
} from '../reducers/product.reducer';

export const selectProductsState = createFeatureSelector<
  ProductAppState,
  ProductState
>(productFeatureKey);

export const selectProductsPending = createSelector(
  selectProductsState,
  (state: ProductState) => state.loading,
);
