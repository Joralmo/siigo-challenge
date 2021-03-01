import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

import { ClientsRoutingModule } from './clients-routing.module';
import { ListClientsComponent } from './pages/list-clients/list-clients.component';
import { ComponentsModule } from '@core/components/components.module';

import {
  clientFeatureKey,
  reducerClient,
} from './clients-store/reducers/client.reducer';
import { ClientEffects } from './clients-store/effects';
import { CreateClientsComponent } from './pages/create-clients/create-clients.component';
import { environment } from '@env/environment';

@NgModule({
  declarations: [ListClientsComponent, CreateClientsComponent],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    ComponentsModule,
    StoreModule.forFeature(clientFeatureKey, reducerClient),
    EffectsModule.forFeature([ClientEffects]),
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
export class ClientsModule {}
