import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Invoice } from '@core/models/invoice.model';
import { selectInvoicesPending } from '../../invoices-store/selectors/invoice.selectors';
import { select, Store } from '@ngrx/store';
import { InvoiceAppState } from '../../invoices-store/reducers/invoice.reducer';
import { InvoiceActions } from '../../invoices-store/actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-invoices',
  templateUrl: './list-invoices.component.html',
  styleUrls: ['./list-invoices.component.scss'],
})
export class ListInvoicesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'seller', 'date', 'actions'];
  dataSource = new MatTableDataSource<Invoice>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  loading$: Observable<boolean> = this.store$.pipe(
    select(selectInvoicesPending),
  );

  constructor(private store$: Store<InvoiceAppState>, private router: Router) {}

  ngOnInit(): void {
    this.store$.dispatch(InvoiceActions.getInvoices());

    this.store$.select('invoices').subscribe(({ invoices }) => {
      this.dataSource = new MatTableDataSource(invoices);
      this.dataSource.paginator = this.paginator;
    });
  }

  see({ id }): void {
    this.router.navigateByUrl(`/invoices/view/${id}`);
  }
}
