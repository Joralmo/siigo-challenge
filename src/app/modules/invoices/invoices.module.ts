import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { ListInvoicesComponent } from './pages/list-invoices/list-invoices.component';
import { CreateInvoicesComponent } from './pages/create-invoices/create-invoices.component';

import {
  invoiceFeatureKey,
  reducerInvoice,
} from './invoices-store/reducers/invoice.reducer';
import { InvoiceEffects } from './invoices-store/effects';
import { ComponentsModule } from '@core/components/components.module';
import { environment } from '@env/environment';

@NgModule({
  declarations: [ListInvoicesComponent, CreateInvoicesComponent],
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    ComponentsModule,
    StoreModule.forFeature(invoiceFeatureKey, reducerInvoice),
    EffectsModule.forFeature([InvoiceEffects]),
    // Translate module
    TranslateModule.forRoot({
      defaultLanguage: environment.defaultLanguage,
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) =>
          new TranslateHttpLoader(http, './assets/i18n/', '.json'),
        deps: [HttpClient],
      },
    }),
  ],
})
export class InvoicesModule {}
