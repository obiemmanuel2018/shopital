import { CustomersignupComponent } from './customersignup/customersignup.component';
import { CustomerloginComponent } from './customerlogin/customerlogin.component';
import { SignupComponent } from './signup/signup.component';

import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthPageRoutingModule } from './auth-routing.module';

import { AuthPage } from './auth.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthPageRoutingModule
  ],
  declarations: [AuthPage, LoginComponent , SignupComponent, CustomerloginComponent , CustomersignupComponent],
  entryComponents: [SignupComponent , CustomersignupComponent]
})
export class AuthPageModule {}
