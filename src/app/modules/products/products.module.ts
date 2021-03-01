import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '@core/components/components.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

import { ProductsRoutingModule } from './products-routing.module';
import { ListProductsComponent } from './pages/list-products/list-products.component';
import {
  productFeatureKey,
  reducerProduct,
} from './products-store/reducers/product.reducer';
import { ProductEffects } from './products-store/effects';
import { CreateProductComponent } from './pages/create-product/create-product.component';
import { environment } from '@env/environment';

@NgModule({
  declarations: [ListProductsComponent, CreateProductComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ComponentsModule,
    StoreModule.forFeature(productFeatureKey, reducerProduct),
    EffectsModule.forFeature([ProductEffects]),
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
export class ProductsModule {}
