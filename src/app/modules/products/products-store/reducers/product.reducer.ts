/* Ngrx */
import { createReducer, on, Action } from '@ngrx/store';
/* Models */
import { InventoryGroups } from '@core/models/inventory-groups.model';
import { Product } from '@core/models/product.model';
/* Actions */
import { ProductActions } from '../actions';
/* Reducers */
import { AppState } from '@core/store/reducers/app.reducers';

export const productFeatureKey = 'products';

export interface ProductState {
  loading: boolean;
  product: Product;
  products: Product[];
  inventoryGroups: InventoryGroups[];
}

export interface ProductAppState extends AppState {
  [productFeatureKey]: ProductState;
}

export const initialState: ProductState = {
  loading: false,
  product: null,
  products: [],
  inventoryGroups: [],
};

const productReducer = createReducer(
  initialState,
  on(ProductActions.getInventoryGroups, state => ({ ...state, loading: true })),
  on(
    ProductActions.getInventoryGroupsSuccess,
    (state, { inventoryGroups }) => ({
      ...state,
      loading: false,
      inventoryGroups,
    }),
  ),
  on(ProductActions.getInventoryGroupsFailure, state => ({
    ...state,
    loading: false,
  })),

  on(ProductActions.getProducts, state => ({ ...state, loading: true })),
  on(ProductActions.getProductsSuccess, (state, { products }) => ({
    ...state,
    loading: false,
    products,
  })),
  on(ProductActions.getProductsFailure, state => ({
    ...state,
    loading: false,
  })),

  on(ProductActions.removeProduct, state => ({ ...state, loading: true })),
  on(ProductActions.removeProductSuccess, state => ({
    ...state,
    loading: false,
  })),
  on(ProductActions.removeProductFailure, state => ({
    ...state,
    loading: false,
  })),

  on(ProductActions.createProduct, state => ({ ...state, loading: true })),
  on(ProductActions.createProductSuccess, state => ({
    ...state,
    loading: false,
  })),
  on(ProductActions.createProductFailure, state => ({
    ...state,
    loading: false,
  })),

  on(ProductActions.updateProduct, state => ({ ...state, loading: true })),
  on(ProductActions.updateProductSuccess, state => ({
    ...state,
    loading: false,
  })),
  on(ProductActions.updateProductFailure, state => ({
    ...state,
    loading: false,
  })),

  on(ProductActions.setProduct, (state, { product }) => ({
    ...state,
    product,
  })),
);

export function reducerProduct(state: ProductState, action: Action): any {
  return productReducer(state, action);
}
