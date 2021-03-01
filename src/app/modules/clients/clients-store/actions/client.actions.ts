/* Ngrx */
import { Client } from '@core/models/client.model';
import { props, createAction } from '@ngrx/store';

/* Models */

const ClientActionsTypes = {
  GET_CLIENTS: '[PRODUTS] Get clients',
  GET_CLIENTS_SUCCESS: '[PRODUTS] Get clients success',
  GET_CLIENTS_FAILURE: '[PRODUTS] Get clients failure',

  GET_CLIENT: '[PRODUTS] Get client',
  GET_CLIENT_SUCCESS: '[PRODUTS] Get client success',
  GET_CLIENT_FAILURE: '[PRODUTS] Get client failure',

  CREATE_CLIENT: '[PRODUTS] Create client',
  CREATE_CLIENT_SUCCESS: '[PRODUTS] Create client success',
  CREATE_CLIENT_FAILURE: '[PRODUTS] Create client failure',

  REMOVE_CLIENT: '[PRODUTS] Remove client',
  REMOVE_CLIENT_SUCCESS: '[PRODUTS] Remove client success',
  REMOVE_CLIENT_FAILURE: '[PRODUTS] Remove client failure',

  UPDATE_CLIENT: '[PRODUTS] Update client',
  UPDATE_CLIENT_SUCCESS: '[PRODUTS] Update client success',
  UPDATE_CLIENT_FAILURE: '[PRODUTS] Update client failure',

  SET_CLIENT: '[CLIENTS] Set clients',
};

export const getClients = createAction(ClientActionsTypes.GET_CLIENTS);

export const getClientsSuccess = createAction(
  ClientActionsTypes.GET_CLIENTS_SUCCESS,
  props<{ clients: Client[] }>(),
);

export const getClientsFailure = createAction(
  ClientActionsTypes.GET_CLIENTS_SUCCESS,
  props<{ error: string }>(),
);

export const getClient = createAction(
  ClientActionsTypes.GET_CLIENT,
  props<{ id: string }>(),
);

export const getClientSuccess = createAction(
  ClientActionsTypes.GET_CLIENT_SUCCESS,
  props<{ client: Client }>(),
);

export const getClientFailure = createAction(
  ClientActionsTypes.GET_CLIENT_FAILURE,
  props<{ error: string }>(),
);

export const createClient = createAction(
  ClientActionsTypes.CREATE_CLIENT,
  props<{ client: Client }>(),
);

export const createClientSuccess = createAction(
  ClientActionsTypes.CREATE_CLIENT_SUCCESS,
);

export const createClientFailure = createAction(
  ClientActionsTypes.CREATE_CLIENT_FAILURE,
  props<{ error: string }>(),
);

export const updateClient = createAction(
  ClientActionsTypes.UPDATE_CLIENT,
  props<{ client: Client }>(),
);

export const updateClientSuccess = createAction(
  ClientActionsTypes.UPDATE_CLIENT_SUCCESS,
);

export const updateClientFailure = createAction(
  ClientActionsTypes.UPDATE_CLIENT_FAILURE,
  props<{ error: string }>(),
);

export const removeClient = createAction(
  ClientActionsTypes.REMOVE_CLIENT,
  props<{ id: string }>(),
);

export const removeClientSuccess = createAction(
  ClientActionsTypes.REMOVE_CLIENT_SUCCESS,
);

export const removeClientFailure = createAction(
  ClientActionsTypes.REMOVE_CLIENT_FAILURE,
  props<{ error: string }>(),
);

export const setClient = createAction(
  ClientActionsTypes.SET_CLIENT,
  props<{ client: Client }>(),
);
