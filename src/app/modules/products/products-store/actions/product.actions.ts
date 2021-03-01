/* Ngrx */
import { InventoryGroups } from '@core/models/inventory-groups.model';
import { Product } from '@core/models/product.model';
import { props, createAction } from '@ngrx/store';

/* Models */

const ProductActionsTypes = {
  GET_INVENTORY_GROUPS: '[PRODUTS] Get inventory groups',
  GET_INVENTORY_GROUPS_SUCCESS: '[PRODUTS] Get inventory groups success',
  GET_INVENTORY_GROUPS_FAILURE: '[PRODUTS] Get inventory groups failure',

  GET_PRODUCTS: '[PRODUTS] Get products',
  GET_PRODUCTS_SUCCESS: '[PRODUTS] Get products success',
  GET_PRODUCTS_FAILURE: '[PRODUTS] Get products failure',

  GET_PRODUCT: '[PRODUTS] Get product',
  GET_PRODUCT_SUCCESS: '[PRODUTS] Get product success',
  GET_PRODUCT_FAILURE: '[PRODUTS] Get product failure',

  CREATE_PRODUCT: '[PRODUTS] Create product',
  CREATE_PRODUCT_SUCCESS: '[PRODUTS] Create product success',
  CREATE_PRODUCT_FAILURE: '[PRODUTS] Create product failure',

  REMOVE_PRODUCT: '[PRODUTS] Remove product',
  REMOVE_PRODUCT_SUCCESS: '[PRODUTS] Remove product success',
  REMOVE_PRODUCT_FAILURE: '[PRODUTS] Remove product failure',

  UPDATE_PRODUCT: '[PRODUTS] Update product',
  UPDATE_PRODUCT_SUCCESS: '[PRODUTS] Update product success',
  UPDATE_PRODUCT_FAILURE: '[PRODUTS] Update product failure',

  SET_PRODUCT: '[PRODUCTS] Set products',
};

export const getInventoryGroups = createAction(
  ProductActionsTypes.GET_INVENTORY_GROUPS,
);

export const getInventoryGroupsSuccess = createAction(
  ProductActionsTypes.GET_INVENTORY_GROUPS_SUCCESS,
  props<{ inventoryGroups: InventoryGroups[] }>(),
);

export const getInventoryGroupsFailure = createAction(
  ProductActionsTypes.GET_INVENTORY_GROUPS_SUCCESS,
  props<{ error: string }>(),
);

export const getProducts = createAction(ProductActionsTypes.GET_PRODUCTS);

export const getProductsSuccess = createAction(
  ProductActionsTypes.GET_PRODUCTS_SUCCESS,
  props<{ products: Product[] }>(),
);

export const getProductsFailure = createAction(
  ProductActionsTypes.GET_PRODUCTS_SUCCESS,
  props<{ error: string }>(),
);

export const getProduct = createAction(
  ProductActionsTypes.GET_PRODUCT,
  props<{ id: string }>(),
);

export const getProductSuccess = createAction(
  ProductActionsTypes.GET_PRODUCT_SUCCESS,
  props<{ product: Product }>(),
);

export const getProductFailure = createAction(
  ProductActionsTypes.GET_PRODUCT_FAILURE,
  props<{ error: string }>(),
);

export const createProduct = createAction(
  ProductActionsTypes.CREATE_PRODUCT,
  props<{ product: Product }>(),
);

export const createProductSuccess = createAction(
  ProductActionsTypes.CREATE_PRODUCT_SUCCESS,
);

export const createProductFailure = createAction(
  ProductActionsTypes.CREATE_PRODUCT_FAILURE,
  props<{ error: string }>(),
);

export const updateProduct = createAction(
  ProductActionsTypes.UPDATE_PRODUCT,
  props<{ product: Product }>(),
);

export const updateProductSuccess = createAction(
  ProductActionsTypes.UPDATE_PRODUCT_SUCCESS,
);

export const updateProductFailure = createAction(
  ProductActionsTypes.UPDATE_PRODUCT_FAILURE,
  props<{ error: string }>(),
);

export const removeProduct = createAction(
  ProductActionsTypes.REMOVE_PRODUCT,
  props<{ id: string }>(),
);

export const removeProductSuccess = createAction(
  ProductActionsTypes.REMOVE_PRODUCT_SUCCESS,
);

export const removeProductFailure = createAction(
  ProductActionsTypes.REMOVE_PRODUCT_FAILURE,
  props<{ error: string }>(),
);

export const setProduct = createAction(
  ProductActionsTypes.SET_PRODUCT,
  props<{ product: Product }>(),
);
