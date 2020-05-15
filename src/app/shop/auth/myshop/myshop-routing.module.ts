import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyshopPage } from './myshop.page';

const routes: Routes = [
  {
    path: '',
    component: MyshopPage
  },
  {
    path: 'newproduct',
    loadChildren: () => import('./newproduct/newproduct.module').then( m => m.NewproductPageModule)
  },
  {
    path: 'editproduct',
    loadChildren: () => import('./editproduct/editproduct.module').then( m => m.EditproductPageModule)
  },
  {
    path: 'editshop',
    loadChildren: () => import('./editshop/editshop.module').then( m => m.EditshopPageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then( m => m.OrdersPageModule)
  },
  {
    path: 'customers',
    loadChildren: () => import('./customers/customers.module').then( m => m.CustomersPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyshopPageRoutingModule {}
