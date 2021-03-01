import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from '@core/models/client.model';
import { select, Store } from '@ngrx/store';
import { ClientActions } from '../../clients-store/actions';
import { ClientAppState } from '../../clients-store/reducers/client.reducer';
import { selectClientsPending } from '../../clients-store/selectors/client.selectors';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.scss'],
})
export class ListClientsComponent implements OnInit {
  loading$: Observable<boolean> = this.store$.pipe(
    select(selectClientsPending),
  );

  displayedColumns: string[] = ['name', 'identification', 'actions'];
  dataSource = new MatTableDataSource<Client>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private store$: Store<ClientAppState>, private router: Router) {}

  ngOnInit(): void {
    this.store$.select('clients').subscribe(({ clients }) => {
      this.dataSource = new MatTableDataSource(clients);
      this.dataSource.paginator = this.paginator;
    });

    this.store$.dispatch(ClientActions.getClients());
  }

  delete({ id }): void {
    this.store$.dispatch(ClientActions.removeClient({ id }));
  }

  update({ id }): void {
    this.router.navigateByUrl(`/clients/update/${id}`);
  }
}
