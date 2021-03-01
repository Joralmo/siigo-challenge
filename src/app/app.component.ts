import { environment } from '@env/environment';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Credentials } from '@core/models/credentials.model';
import { NavItem } from '@core/models/nav-item.model';
import { AuthActions } from '@core/store/auth/actions';
import { AppState } from '@core/store/reducers/app.reducers';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy, OnInit {
  public opened = true;
  private mediaWatcher: Subscription;
  public menu: NavItem[] = [
    {
      route: '/',
      iconName: 'home',
      name: 'Inicio',
    },
    {
      route: 'invoices',
      iconName: 'account_balance_wallet',
      name: 'Facturación',
      children: [
        {
          route: 'invoices',
          name: 'Listar',
          iconName: 'list',
        },
        {
          route: 'invoices/create',
          name: 'Crear',
          iconName: 'edit',
        },
      ],
    },
    {
      route: 'products',
      iconName: 'all_inbox',
      name: 'Productos',
      children: [
        {
          route: 'products',
          name: 'Listar',
          iconName: 'list',
        },
        {
          route: 'products/create',
          name: 'Crear',
          iconName: 'edit',
        },
      ],
    },
    {
      route: 'clients',
      iconName: 'person',
      name: 'Clientes',
      children: [
        {
          route: 'clients',
          name: 'Listar',
          iconName: 'list',
        },
        {
          route: 'clients/create',
          name: 'Crear',
          iconName: 'edit',
        },
      ],
    },
  ];

  constructor(private media: MediaObserver, private store$: Store<AppState>) {
    this.mediaWatcher = this.media.asObservable().subscribe(() => {
      this.handleMediaChange();
    });
  }

  private handleMediaChange(): void {
    if (this.media.isActive('lt-md')) {
      this.opened = false;
    } else {
      this.opened = true;
    }
  }

  ngOnDestroy(): void {
    this.mediaWatcher.unsubscribe();
  }

  ngOnInit(): void {
    const credentials: Credentials = {
      username: environment.username,
      access_key: environment.accessKey,
    };
    this.store$.dispatch(AuthActions.signIn({ credentials }));
  }
}
