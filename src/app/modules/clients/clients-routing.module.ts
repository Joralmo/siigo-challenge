import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateClientsComponent } from './pages/create-clients/create-clients.component';
import { ListClientsComponent } from './pages/list-clients/list-clients.component';

const routes: Routes = [
  {
    path: '',
    component: ListClientsComponent,
  },
  {
    path: 'create',
    component: CreateClientsComponent,
  },
  {
    path: 'update/:id',
    component: CreateClientsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}
