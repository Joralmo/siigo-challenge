/* Ngrx */
import { Document } from '@core/models/document.model';
import { Invoice } from '@core/models/invoice.model';
import { PaymentMethods } from '@core/models/payment-methods.model';
import { User } from '@core/models/user.model';
import { props, createAction } from '@ngrx/store';

/* Models */

const InvoiceActionsTypes = {
  GET_INVOICES: '[INVOICES] Get invoices',
  GET_INVOICES_SUCCESS: '[INVOICES] Get invoices success',
  GET_INVOICES_FAILURE: '[INVOICES] Get invoices failure',

  GET_INVOICE: '[INVOICES] Get invoice',
  GET_INVOICE_SUCCESS: '[INVOICES] Get invoice success',
  GET_INVOICE_FAILURE: '[INVOICES] Get invoice failure',

  GET_SELLERS: '[INVOICES] Get sellers',
  GET_SELLERS_SUCCESS: '[INVOICES] Get sellers success',
  GET_SELLERS_FAILURE: '[INVOICES] Get sellers failure',

  GET_DOCUMENT_TYPES: '[INVOICES] Get document types',
  GET_DOCUMENT_TYPES_SUCCESS: '[INVOICES] Get document types success',
  GET_DOCUMENT_TYPES_FAILURE: '[INVOICES] Get document types failure',

  GET_PAYMENT_METHODS: '[INVOICES] Get payment methods',
  GET_PAYMENT_METHODS_SUCCESS: '[INVOICES] Get payment methods success',
  GET_PAYMENT_METHODS_FAILURE: '[INVOICES] Get payment methods failure',

  CREATE_INVOICE: '[INVOICES] Create invoice',
  CREATE_INVOICE_SUCCESS: '[INVOICES] Create invoice success',
  CREATE_INVOICE_FAILURE: '[INVOICES] Create invoice failure',

  SET_INVOICE: '[INVOICES] Set invoices',
};

export const getInvoices = createAction(InvoiceActionsTypes.GET_INVOICES);

export const getInvoicesSuccess = createAction(
  InvoiceActionsTypes.GET_INVOICES_SUCCESS,
  props<{ invoices: Invoice[] }>(),
);

export const getInvoicesFailure = createAction(
  InvoiceActionsTypes.GET_INVOICES_SUCCESS,
  props<{ error: string }>(),
);

export const getInvoice = createAction(
  InvoiceActionsTypes.GET_INVOICE,
  props<{ id: string }>(),
);

export const getInvoiceSuccess = createAction(
  InvoiceActionsTypes.GET_INVOICE_SUCCESS,
  props<{ invoice: Invoice }>(),
);

export const getInvoiceFailure = createAction(
  InvoiceActionsTypes.GET_INVOICE_FAILURE,
  props<{ error: string }>(),
);

export const getSellers = createAction(InvoiceActionsTypes.GET_SELLERS);

export const getSellersSuccess = createAction(
  InvoiceActionsTypes.GET_SELLERS_SUCCESS,
  props<{ sellers: User[] }>(),
);

export const getSellersFailure = createAction(
  InvoiceActionsTypes.GET_SELLERS_FAILURE,
  props<{ error: string }>(),
);

export const getDocumentTypes = createAction(
  InvoiceActionsTypes.GET_DOCUMENT_TYPES,
);

export const getDocumentTypesSuccess = createAction(
  InvoiceActionsTypes.GET_DOCUMENT_TYPES_SUCCESS,
  props<{ documentTypes: Document[] }>(),
);

export const getDocumentTypesFailure = createAction(
  InvoiceActionsTypes.GET_DOCUMENT_TYPES_FAILURE,
  props<{ error: string }>(),
);

export const getPaymentMethods = createAction(
  InvoiceActionsTypes.GET_PAYMENT_METHODS,
);

export const getPaymentMethodsSuccess = createAction(
  InvoiceActionsTypes.GET_PAYMENT_METHODS_SUCCESS,
  props<{ paymentMethods: PaymentMethods[] }>(),
);

export const getPaymentMethodsFailure = createAction(
  InvoiceActionsTypes.GET_PAYMENT_METHODS_FAILURE,
  props<{ error: string }>(),
);

export const createInvoice = createAction(
  InvoiceActionsTypes.CREATE_INVOICE,
  props<{ invoice: Invoice }>(),
);

export const createInvoiceSuccess = createAction(
  InvoiceActionsTypes.CREATE_INVOICE_SUCCESS,
);

export const createInvoiceFailure = createAction(
  InvoiceActionsTypes.CREATE_INVOICE_FAILURE,
  props<{ error: string }>(),
);

export const setInvoice = createAction(
  InvoiceActionsTypes.SET_INVOICE,
  props<{ invoice: Invoice }>(),
);
