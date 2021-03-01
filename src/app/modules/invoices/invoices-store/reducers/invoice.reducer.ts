/* Ngrx */
import { createReducer, on, Action } from '@ngrx/store';
/* Models */
import { Invoice } from '@core/models/invoice.model';
import { User } from '@core/models/user.model';
import { Document } from '@core/models/document.model';
import { PaymentMethods } from '@core/models/payment-methods.model';
/* Actions */
import { InvoiceActions } from '../actions';
/* Reducers */
import { AppState } from '@core/store/reducers/app.reducers';

export const invoiceFeatureKey = 'invoices';

export interface InvoiceState {
  loading: boolean;
  invoice: Invoice;
  invoices: Invoice[];
  sellers: User[];
  documentTypes: Document[];
  paymentMethods: PaymentMethods[];
}

export interface InvoiceAppState extends AppState {
  [invoiceFeatureKey]: InvoiceState;
}

export const initialState: InvoiceState = {
  loading: false,
  invoice: null,
  invoices: [],
  sellers: [],
  documentTypes: [],
  paymentMethods: [],
};

const invoiceReducer = createReducer(
  initialState,
  on(InvoiceActions.getInvoices, state => ({ ...state, loading: true })),
  on(InvoiceActions.getInvoicesSuccess, (state, { invoices }) => ({
    ...state,
    loading: false,
    invoices,
  })),
  on(InvoiceActions.getInvoicesFailure, state => ({
    ...state,
    loading: false,
  })),

  on(InvoiceActions.getInvoice, state => ({ ...state, loading: true })),
  on(InvoiceActions.getInvoiceSuccess, (state, { invoice }) => ({
    ...state,
    loading: false,
    invoice,
  })),
  on(InvoiceActions.getInvoiceFailure, state => ({
    ...state,
    loading: false,
  })),

  on(InvoiceActions.getSellers, state => ({ ...state, loading: true })),
  on(InvoiceActions.getSellersSuccess, (state, { sellers }) => ({
    ...state,
    loading: false,
    sellers,
  })),
  on(InvoiceActions.getSellersFailure, state => ({
    ...state,
    loading: false,
  })),

  on(InvoiceActions.getDocumentTypes, state => ({ ...state, loading: true })),
  on(InvoiceActions.getDocumentTypesSuccess, (state, { documentTypes }) => ({
    ...state,
    loading: false,
    documentTypes,
  })),
  on(InvoiceActions.getDocumentTypesFailure, state => ({
    ...state,
    loading: false,
  })),

  on(InvoiceActions.getPaymentMethods, state => ({ ...state, loading: true })),
  on(InvoiceActions.getPaymentMethodsSuccess, (state, { paymentMethods }) => ({
    ...state,
    loading: false,
    paymentMethods,
  })),
  on(InvoiceActions.getPaymentMethodsFailure, state => ({
    ...state,
    loading: false,
  })),

  on(InvoiceActions.createInvoice, state => ({ ...state, loading: true })),
  on(InvoiceActions.createInvoiceSuccess, state => ({
    ...state,
    loading: false,
  })),
  on(InvoiceActions.createInvoiceFailure, state => ({
    ...state,
    loading: false,
  })),

  on(InvoiceActions.setInvoice, (state, { invoice }) => ({
    ...state,
    invoice,
  })),
);

export function reducerInvoice(state: InvoiceState, action: Action): any {
  return invoiceReducer(state, action);
}
