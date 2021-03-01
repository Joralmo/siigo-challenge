import { Injectable } from '@angular/core';

/* Ngrx */
import { Actions, createEffect, ofType } from '@ngrx/effects';

/* Services  */
import { InvoicesService } from '@core/services/invoices.service';

/* Rxjs */
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

/* Actions */
import { InvoiceActions } from '../actions';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { InvoiceAppState } from '../reducers/invoice.reducer';

@Injectable()
export class InvoiceEffects {
  constructor(
    private actions$: Actions,
    private invoiceService: InvoicesService,
    private router: Router,
    private store$: Store<InvoiceAppState>,
  ) {}

  getAllInvoices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoiceActions.getInvoices),
      mergeMap(_ =>
        this.invoiceService.getAll().pipe(
          map(({ results: invoices }) =>
            InvoiceActions.getInvoicesSuccess({ invoices }),
          ),
          catchError(error => of(InvoiceActions.getInvoicesFailure({ error }))),
        ),
      ),
    ),
  );

  createInvoice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoiceActions.createInvoice),
      mergeMap(({ invoice }) =>
        this.invoiceService.create(invoice).pipe(
          map(_ => {
            this.router.navigateByUrl('/invoices');
            this.store$.dispatch(InvoiceActions.createInvoiceSuccess());
            return InvoiceActions.getInvoices();
          }),
          catchError(error =>
            of(InvoiceActions.createInvoiceFailure({ error })),
          ),
        ),
      ),
    ),
  );

  findByID$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoiceActions.getInvoice),
      mergeMap(({ id }) =>
        this.invoiceService.findByID(id).pipe(
          map(invoice => InvoiceActions.getInvoiceSuccess({ invoice })),
          catchError(error => of(InvoiceActions.getInvoiceFailure({ error }))),
        ),
      ),
    ),
  );

  getSellers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoiceActions.getSellers),
      mergeMap(_ =>
        this.invoiceService.getSellers().pipe(
          map(({ results: sellers }) =>
            InvoiceActions.getSellersSuccess({ sellers }),
          ),
          catchError(error => of(InvoiceActions.getSellersFailure({ error }))),
        ),
      ),
    ),
  );

  getDocumentTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoiceActions.getDocumentTypes),
      mergeMap(_ =>
        this.invoiceService.getDocumentTypes().pipe(
          map(documentTypes =>
            InvoiceActions.getDocumentTypesSuccess({ documentTypes }),
          ),
          catchError(error =>
            of(InvoiceActions.getDocumentTypesFailure({ error })),
          ),
        ),
      ),
    ),
  );

  getPaymentMethods$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoiceActions.getPaymentMethods),
      mergeMap(_ =>
        this.invoiceService.getPaymentMethods().pipe(
          map(paymentMethods =>
            InvoiceActions.getPaymentMethodsSuccess({ paymentMethods }),
          ),
          catchError(error =>
            of(InvoiceActions.getPaymentMethodsFailure({ error })),
          ),
        ),
      ),
    ),
  );
}
