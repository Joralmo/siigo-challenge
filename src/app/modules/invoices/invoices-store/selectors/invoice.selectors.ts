/* Ngrx */
import { createSelector, createFeatureSelector } from '@ngrx/store';

/* Reducers */
import {
  InvoiceAppState,
  InvoiceState,
  invoiceFeatureKey,
} from '../reducers/invoice.reducer';

export const selectInvoicesState = createFeatureSelector<
  InvoiceAppState,
  InvoiceState
>(invoiceFeatureKey);

export const selectInvoicesPending = createSelector(
  selectInvoicesState,
  (state: InvoiceState) => state.loading,
);
