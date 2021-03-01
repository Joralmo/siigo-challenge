/* Ngrx */
import { createReducer, on, Action } from '@ngrx/store';
/* Models */
/* Actions */
import { ClientActions } from '../actions';
/* Reducers */
import { AppState } from '@core/store/reducers/app.reducers';
import { Client } from '@core/models/client.model';
import { City } from '@core/models/city.modal';
import { Identification } from '@core/models/identification.modal';

export const clientFeatureKey = 'clients';

export interface ClientState {
  loading: boolean;
  client: Client;
  clients: Client[];
  cities: City[];
  identificationTypes: Identification[];
}

export interface ClientAppState extends AppState {
  [clientFeatureKey]: ClientState;
}

export const initialState: ClientState = {
  loading: false,
  client: null,
  clients: [],
  cities: [
    {
      city_code: '47189',
      country_code: 'Co',
      name: 'Ciénaga',
      state_code: '47',
    },
    {
      city_code: '11001',
      country_code: 'Co',
      name: 'Bogotá',
      state_code: '11',
    },
    {
      city_code: '47001',
      country_code: 'Co',
      name: 'Santa Marta',
      state_code: '47',
    },
    {
      city_code: '8001',
      country_code: 'Co',
      name: 'Barranquilla',
      state_code: '8',
    },
    {
      city_code: '13001',
      country_code: 'Co',
      name: 'Cartagena',
      state_code: '13',
    },
  ],
  identificationTypes: [
    {
      id_type: '13',
      name: 'Cédula de ciudadanía',
    },
    {
      id_type: '31',
      name: 'NIT',
    },
    {
      id_type: '22',
      name: 'Cédula de extranjería',
    },
    {
      id_type: '42',
      name: 'Documento de identificación extranjero',
    },
    {
      id_type: '50',
      name: 'NIT de otro país',
    },
    {
      id_type: 'R-00-PN',
      name: 'No obligado a registrarse en el RUT PN',
    },
    {
      id_type: '91',
      name: 'NUIP',
    },
    {
      id_type: '41',
      name: 'Pasaporte',
    },
    {
      id_type: '14',
      name: 'Permiso especial de permanencia PEP',
    },
    {
      id_type: '11',
      name: 'Registro civil',
    },
    {
      id_type: '43',
      name: 'Sin identificación del exterior o para uso definido por la DIAN',
    },
    {
      id_type: '21',
      name: 'Tarjeta de extranjería',
    },
    {
      id_type: '12',
      name: 'Tarjeta de identidad',
    },
  ],
};

const clientReducer = createReducer(
  initialState,
  on(ClientActions.getClients, state => ({ ...state, loading: true })),
  on(ClientActions.getClientsSuccess, (state, { clients }) => ({
    ...state,
    loading: false,
    clients,
  })),
  on(ClientActions.getClientsFailure, state => ({
    ...state,
    loading: false,
  })),

  on(ClientActions.getClient, state => ({ ...state, loading: true })),
  on(ClientActions.getClientSuccess, (state, { client }) => ({
    ...state,
    loading: false,
    client,
  })),
  on(ClientActions.getClientFailure, state => ({
    ...state,
    loading: false,
  })),

  on(ClientActions.removeClient, state => ({ ...state, loading: true })),
  on(ClientActions.removeClientSuccess, state => ({
    ...state,
    loading: false,
  })),
  on(ClientActions.removeClientFailure, state => ({
    ...state,
    loading: false,
  })),

  on(ClientActions.createClient, state => ({ ...state, loading: true })),
  on(ClientActions.createClientSuccess, state => ({
    ...state,
    loading: false,
  })),
  on(ClientActions.createClientFailure, state => ({
    ...state,
    loading: false,
  })),

  on(ClientActions.updateClient, state => ({ ...state, loading: true })),
  on(ClientActions.updateClientSuccess, state => ({
    ...state,
    loading: false,
  })),
  on(ClientActions.updateClientFailure, state => ({
    ...state,
    loading: false,
  })),

  on(ClientActions.setClient, (state, { client }) => ({
    ...state,
    client,
  })),
);

export function reducerClient(state: ClientState, action: Action): any {
  return clientReducer(state, action);
}
