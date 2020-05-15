import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPage } from './auth.page';

const routes: Routes = [
  {
    path: '',
    component: AuthPage
  },
  {
    path: 'myshop',
    loadChildren: () => import('./myshop/myshop.module').then( m => m.MyshopPageModule)
  },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
}) 
export class AuthPageRoutingModule {}
