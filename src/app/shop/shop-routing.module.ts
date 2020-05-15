import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthGuard } from "./auth/auth.guard";

import { ShopPage } from './shop.page';

const routes: Routes = [
  {path: '', redirectTo: 'myshop', pathMatch: 'full'},
   {
    path: '',
    component: ShopPage,
    children: [
      {path: '', redirectTo: 'myshop', pathMatch: 'full'},
      {path: 'myshop',
      children: [
        {path: '', loadChildren: () => import('./auth/myshop/myshop.module').then( m => m.MyshopPageModule)},
        {path: 'customers', loadChildren: () => import('./auth/myshop/customers/customers.module').then( m => m.CustomersPageModule)},
        {path: 'editproduct/:productId',loadChildren: () => import('./auth/myshop/editproduct/editproduct.module').then( m => m.EditproductPageModule)},
        {path: 'editshop', loadChildren: () => import('./auth/myshop/editshop/editshop.module').then( m => m.EditshopPageModule)},
        {path: 'newproduct', loadChildren: () => import('./auth/myshop/newproduct/newproduct.module').then( m => m.NewproductPageModule)},
        {path: 'orders', loadChildren: () => import('./auth/myshop/orders/orders.module').then( m => m.OrdersPageModule)}
      ]
    }],canActivate: [AuthGuard]
   },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopPageRoutingModule {}
