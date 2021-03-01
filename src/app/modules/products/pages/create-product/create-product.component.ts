import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryGroups } from '@core/models/library.model';
import { Product } from '@core/models/product.model';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ProductActions } from '../../products-store/actions';
import { ProductAppState } from '../../products-store/reducers/product.reducer';
import { selectProductsPending } from '../../products-store/selectors/product.selectors';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
  showForm = false;
  showLoading = true;
  listInventoryGroups: InventoryGroups[] = [];
  loading$: Observable<boolean> = this.store$.pipe(
    select(selectProductsPending),
  );
  formGroup: FormGroup;
  responseApi: string = null;
  constructor(
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private store$: Store<ProductAppState>,
  ) {}

  ngOnInit(): void {
    this.store$.select('products').subscribe(({ inventoryGroups }) => {
      this.listInventoryGroups = inventoryGroups;
    });

    this.store$.dispatch(ProductActions.getInventoryGroups());
    this.createForm();
  }

  createForm(): void {
    this.formGroup = this.formBuilder.group({
      account_group: [null, [Validators.required]],
      code: [null, [Validators.required]],
      name: [null, [Validators.required]],
      price: [null, [Validators.required]],
    });
  }

  getErrorForm(control): boolean {
    return (
      !this.formGroup.controls[control].valid &&
      this.formGroup.controls[control].touched
    );
  }

  async create(product: Product): Promise<any> {
    this.store$.dispatch(ProductActions.createProduct({ product }));
  }

  createOtherProduct(): void {
    this.formGroup.reset();
    this.responseApi = null;
  }

  getErrorFormField(field): string {
    const fieldTranslate = this.translate.instant(field);
    const param = { value: fieldTranslate };
    return this.translate.instant('Required', param);
  }
}
