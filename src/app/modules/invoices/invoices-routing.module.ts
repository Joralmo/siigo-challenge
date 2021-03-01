import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateInvoicesComponent } from './pages/create-invoices/create-invoices.component';
import { ListInvoicesComponent } from './pages/list-invoices/list-invoices.component';

const routes: Routes = [
  {
    path: '',
    component: ListInvoicesComponent,
  },
  { path: 'create', component: CreateInvoicesComponent },
  { path: 'view/:id', component: CreateInvoicesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoicesRoutingModule {}
