import { ModalController } from '@ionic/angular';
import { ShopService } from './../myshop/shop.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  constructor(
    private shopService: ShopService,
    private ModalCtr: ModalController,
   

     ) { }
 
  ngOnInit() {}
  onSignup(form: NgForm) {
    // adding a product array into shop to store all shopmproducts
  


    
    console.log("username" + form.value.username);
    this.shopService.CreateShop( form.value.username , form.value.password , form.value.shopName , form.value.shopAddress, form.value.email , form.value.phoneNumber, form.value.fullName ).subscribe();
    
   
  }
  onClose() {
    this.ModalCtr.dismiss();
  }

}
