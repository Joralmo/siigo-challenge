import { TranslateService } from '@ngx-translate/core';
import { selectInvoicesPending } from './../../invoices-store/selectors/invoice.selectors';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoiceAppState } from '../../invoices-store/reducers/invoice.reducer';
import { InvoiceActions } from '../../invoices-store/actions';
import { User } from '@core/models/user.model';
import { Document } from '@core/models/document.model';
import { PaymentMethods } from '@core/models/payment-methods.model';
import { Invoice } from '@core/models/invoice.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from '@core/models/customer.model';
import { Item } from '@core/models/item.model';
import { Payment } from '@core/models/payment.model';

@Component({
  selector: 'app-create-invoices',
  templateUrl: './create-invoices.component.html',
  styleUrls: ['./create-invoices.component.scss'],
})
export class CreateInvoicesComponent implements OnInit, OnDestroy {
  private id: string;
  invoice: Invoice;
  sellers: User[];
  documentTypes: Document[];
  paymentMethods: PaymentMethods[];
  formGroup: FormGroup;

  loading$: Observable<boolean> = this.store$.pipe(
    select(selectInvoicesPending),
  );

  constructor(
    private router: ActivatedRoute,
    private store$: Store<InvoiceAppState>,
    private translate: TranslateService,
    private formBuilder: FormBuilder,
  ) {
    this.router.params.subscribe(({ id }) => (this.id = id));
    this.createForm();
  }

  ngOnInit(): void {
    this.store$
      .select('invoices')
      .subscribe(({ invoice, sellers, documentTypes, paymentMethods }) => {
        this.invoice = invoice;
        this.sellers = sellers;
        this.documentTypes = documentTypes;
        this.paymentMethods = paymentMethods;
        if (invoice) {
          this.formGroup.controls.document_type.setValue(invoice.document.id);
          this.formGroup.controls.identification.setValue(
            invoice.customer.identification,
          );
          this.formGroup.controls.seller.setValue(invoice.seller);
          this.formGroup.controls.code.setValue(invoice.items[0].code);
          this.formGroup.controls.description.setValue(
            invoice.items[0].description,
          );
          this.formGroup.controls.price.setValue(invoice.items[0].price);
          this.formGroup.controls.quantity.setValue(invoice.items[0].quantity);
          this.formGroup.controls.payment_method.setValue(
            invoice.payments[0].id,
          );

          Object.keys(this.formGroup.value).forEach(key => {
            this.formGroup.get(key).disable();
          });
        }
      });

    if (this.id) {
      this.store$.dispatch(InvoiceActions.getInvoice({ id: this.id }));
    }

    this.store$.dispatch(InvoiceActions.getSellers());
    this.store$.dispatch(InvoiceActions.getDocumentTypes());
    this.store$.dispatch(InvoiceActions.getPaymentMethods());
  }

  createForm(): void {
    this.formGroup = this.formBuilder.group({
      document_type: ['', [Validators.required]],
      identification: ['', [Validators.required]],
      seller: ['', [Validators.required]],
      code: ['', [Validators.required]],
      description: [''],
      quantity: ['', [Validators.required]],
      price: ['', [Validators.required]],
      payment_method: ['', [Validators.required]],
    });
  }

  getErrorFormField(field): string {
    const fieldTranslate = this.translate.instant(field);
    const param = { value: fieldTranslate };
    return this.translate.instant('Required', param);
  }

  getErrorForm(control): boolean {
    return (
      !this.formGroup.controls[control].valid &&
      this.formGroup.controls[control].touched
    );
  }

  create(data: any): void {
    const invoice = this.constructInvoice(data);
    this.store$.dispatch(InvoiceActions.createInvoice({ invoice }));
  }

  /**
   * Función encargada de preparar la data antes de ser enviada al servidor.
   *
   * @param data formulario
   */
  constructInvoice(data): Invoice {
    const document: Document = {
      id: data.document_type,
    };

    const now = new Date();
    const date = this.formatDate(now);

    const customer: Customer = {
      identification: data.identification,
    };

    const item: Item = {
      code: data.code,
      price: data.price,
      quantity: data.quantity,
      description: data.description,
    };

    const payment: Payment = {
      id: data.payment_method,
      value: data.price,
    };

    const invoice: Invoice = {
      customer,
      date,
      document,
      items: [item],
      payments: [payment],
      seller: data.seller,
    };

    return invoice;
  }

  /**
   * Función encargada de devolver cualquier fecha en formato yyyy-mm-dd.
   *
   * @param date fecha a formatear
   */
  formatDate(date): any {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  }

  ngOnDestroy(): void {
    this.id = null;
  }
}
