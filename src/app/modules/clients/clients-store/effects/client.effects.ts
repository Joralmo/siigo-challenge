import { Injectable } from '@angular/core';

/* Ngrx */
import { Actions, createEffect, ofType } from '@ngrx/effects';

/* Services  */
import { ClientsService } from '@core/services/clients.service';

/* Rxjs */
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

/* Actions */
import { ClientActions } from '../actions';
import { Store } from '@ngrx/store';
import { ClientAppState } from '../reducers/client.reducer';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ClientEffects {
  constructor(
    private actions$: Actions,
    private clientService: ClientsService,
    private store$: Store<ClientAppState>,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  getAllClients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientActions.getClients),
      mergeMap(_ =>
        this.clientService.getAll().pipe(
          map(({ results: clients }) =>
            ClientActions.getClientsSuccess({ clients }),
          ),
          catchError(error => of(ClientActions.getClientsFailure({ error }))),
        ),
      ),
    ),
  );

  deleteClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientActions.removeClient),
      mergeMap(({ id }) =>
        this.clientService.remove(id).pipe(
          map(_ => {
            this.store$.dispatch(ClientActions.removeClientSuccess());
            this.toastr.success('¡Elemento eliminado con éxito!');
            return ClientActions.getClients();
          }),
          catchError(error => of(ClientActions.getClientsFailure({ error }))),
        ),
      ),
    ),
  );

  createClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientActions.createClient),
      mergeMap(({ client }) =>
        this.clientService.create(client).pipe(
          map(_ => {
            this.store$.dispatch(ClientActions.createClientSuccess());
            this.router.navigateByUrl('clients');
            this.toastr.success('¡Elemento creado con éxito!');
            return ClientActions.getClients();
          }),
          catchError(error => of(ClientActions.createClientFailure({ error }))),
        ),
      ),
    ),
  );

  updateClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientActions.updateClient),
      mergeMap(({ client }) =>
        this.clientService.update(client).pipe(
          map(_ => {
            this.store$.dispatch(ClientActions.updateClientSuccess());
            this.router.navigateByUrl('clients');
            this.toastr.success('¡Elemento actualizado con éxito!');
            return ClientActions.getClients();
          }),
          catchError(error => of(ClientActions.updateClientFailure({ error }))),
        ),
      ),
    ),
  );

  findByID$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientActions.getClient),
      mergeMap(({ id }) =>
        this.clientService.findByID(id).pipe(
          map(client => ClientActions.getClientSuccess({ client })),
          catchError(error => of(ClientActions.getClientFailure({ error }))),
        ),
      ),
    ),
  );
}
