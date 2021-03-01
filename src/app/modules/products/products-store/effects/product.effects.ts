import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

/* Ngrx */
import { Actions, createEffect, ofType } from '@ngrx/effects';

/* Services  */
import { ProductsService } from '@core/services/products.service';

/* Rxjs */
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

/* Actions */
import { ProductActions } from '../actions';
import { Store } from '@ngrx/store';
import { ProductAppState } from '../reducers/product.reducer';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductsService,
    private router: Router,
    private store$: Store<ProductAppState>,
    private toastr: ToastrService,
  ) {}

  getInventoryGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.getInventoryGroups),
      mergeMap(_ =>
        this.productService.getAccountsGroups().pipe(
          map(inventoryGroups =>
            ProductActions.getInventoryGroupsSuccess({ inventoryGroups }),
          ),
          catchError(error =>
            of(ProductActions.getInventoryGroupsFailure({ error })),
          ),
        ),
      ),
    ),
  );

  getAllProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.getProducts),
      mergeMap(_ =>
        this.productService.getAll().pipe(
          map(({ results: products }) =>
            ProductActions.getProductsSuccess({ products }),
          ),
          catchError(error => of(ProductActions.getProductsFailure({ error }))),
        ),
      ),
    ),
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.removeProduct),
      mergeMap(({ id }) =>
        this.productService.remove(id).pipe(
          map(_ => {
            this.store$.dispatch(ProductActions.removeProductSuccess());
            this.toastr.success('¡Elemento eliminado con éxito!');
            return ProductActions.getProducts();
          }),
          catchError(error => of(ProductActions.getProductsFailure({ error }))),
        ),
      ),
    ),
  );

  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.createProduct),
      mergeMap(({ product }) =>
        this.productService.create(product).pipe(
          map(_ => {
            this.router.navigateByUrl('/products');
            this.toastr.success('¡Elemento creado con éxito!');
            this.store$.dispatch(ProductActions.createProductSuccess());
            return ProductActions.getProducts();
          }),
          catchError(error =>
            of(ProductActions.createProductFailure({ error })),
          ),
        ),
      ),
    ),
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      mergeMap(({ product }) =>
        this.productService.update(product).pipe(
          map(_ => {
            this.router.navigateByUrl('/products');
            this.toastr.success('¡Elemento actualizado con éxito!');
            this.store$.dispatch(ProductActions.updateProductSuccess());
            return ProductActions.getProducts();
          }),
          catchError(error =>
            of(ProductActions.updateProductFailure({ error })),
          ),
        ),
      ),
    ),
  );

  findByID$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.getProduct),
      mergeMap(({ id }) =>
        this.productService.findByID(id).pipe(
          map(product => ProductActions.getProductSuccess({ product })),
          catchError(error => of(ProductActions.getProductFailure({ error }))),
        ),
      ),
    ),
  );
}
