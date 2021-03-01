import { Observable } from 'rxjs';
import { Product } from '@core/models/library.model';
import { OnInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import { ProductAppState } from '../../products-store/reducers/product.reducer';
import { ProductActions } from '../../products-store/actions';
import { selectProductsPending } from '../../products-store/selectors/product.selectors';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
})
export class ListProductsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'type', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  loading$: Observable<boolean> = this.store$.pipe(
    select(selectProductsPending),
  );

  constructor(private store$: Store<ProductAppState>) {}

  ngOnInit(): void {
    this.store$.dispatch(ProductActions.getProducts());

    this.store$.select('products').subscribe(({ products }) => {
      this.dataSource = new MatTableDataSource(products);
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteProduct({ id }): void {
    this.store$.dispatch(ProductActions.removeProduct({ id }));
  }

  update(product: Product): void {
    this.store$.dispatch(ProductActions.setProduct({ product }));
  }
}
