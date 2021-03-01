import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { City } from '@core/models/city.modal';
import { Identification } from '@core/models/identification.modal';
import { select, Store } from '@ngrx/store';
import { ClientAppState } from '../../clients-store/reducers/client.reducer';
import { selectClientsPending } from '../../clients-store/selectors/client.selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Address, Client, Contact, Phone } from '@core/models/client.model';
import { ClientActions } from '../../clients-store/actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-clients',
  templateUrl: './create-clients.component.html',
  styleUrls: ['./create-clients.component.scss'],
})
export class CreateClientsComponent implements OnInit {
  cities: City[];
  identificationTypes: Identification[];
  loading$: Observable<boolean> = this.store$.pipe(
    select(selectClientsPending),
  );

  formGroup: FormGroup;
  id: string;

  constructor(
    private store$: Store<ClientAppState>,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private activedRouter: ActivatedRoute,
  ) {
    this.createForm();
    this.activedRouter.params.subscribe(({ id }) => (this.id = id));
  }

  ngOnInit(): void {
    this.store$
      .select('clients')
      .subscribe(({ cities, identificationTypes, client }) => {
        this.cities = cities;
        this.identificationTypes = identificationTypes;

        if (client) {
          this.formGroup.controls.person_type.setValue(
            client.person_type === 'Person' ? '1' : '2',
          );
          this.formGroup.controls.id_type.setValue(
            client.id_type.code.toString().trim(),
          );
          this.formGroup.controls.identification.setValue(
            client.identification,
          );
          this.formGroup.controls.name.setValue(client.name[0]);
          this.formGroup.controls.lastName.setValue(client.name[1]);
          this.formGroup.controls.address.setValue(client.address.address);
          this.formGroup.controls.city.setValue(client.address.city);
          this.formGroup.controls.phone.setValue(
            client.contacts[0].phone.number,
          );
          this.formGroup.controls.first_name.setValue(
            client.contacts[0].first_name,
          );
          this.formGroup.controls.last_name.setValue(
            client.contacts[0].last_name,
          );
          this.formGroup.controls.email.setValue(client.contacts[0].email);
        }
      });

    if (this.id) {
      this.store$.dispatch(ClientActions.getClient({ id: this.id }));
    }
  }

  createForm(): void {
    this.formGroup = this.formBuilder.group({
      person_type: ['1', [Validators.required]],
      id_type: [null, [Validators.required]],
      identification: [null, [Validators.required]],
      name: [null, [Validators.required]],
      lastName: [null],
      address: [null, [Validators.required]],
      city: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      email: [null, [Validators.required]],
    });
  }

  getErrorFormField(field): string {
    const fieldTranslate = this.translate.instant(field);
    const param = { value: fieldTranslate };
    return this.translate.instant('Required', param);
  }

  getErrorForm(control): boolean {
    return (
      !this.formGroup.controls[control].valid &&
      this.formGroup.controls[control].touched
    );
  }

  getFieldValue(control): any {
    return this.formGroup.controls[control].value;
  }

  create(data): void {
    const client = this.constructThirdParty(data);
    if (this.id) {
      this.store$.dispatch(
        ClientActions.updateClient({ client: { id: this.id, ...client } }),
      );
    } else {
      this.store$.dispatch(ClientActions.createClient({ client }));
    }
  }

  constructThirdParty(data): Client {
    const city: City = this.cities.filter(
      (c: City) => c.city_code === data.city,
    )[0];
    const contact: Contact = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
    };
    const address: Address = {
      address: data.address,
      city,
    };
    const phone: Phone = {
      number: data.phone,
    };
    const person_type = this.getFieldValue('person_type');
    const thirdParty: Client = {
      address,
      contacts: [contact],
      id_type: data.id_type,
      identification: data.identification,
      name: person_type === 1 ? [data.name, data.lastName] : [data.name],
      person_type: person_type === 1 ? 'Person' : 'Company',
      phones: [phone],
    };
    return thirdParty;
  }
}
