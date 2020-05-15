import { SignupComponent } from './../signup/signup.component';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { LoadingController, AlertController, ModalController } from '@ionic/angular';
import { ShopService } from './../myshop/shop.service';
import { Shop } from './../myshop/shop';
import { Component, OnInit, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
@Input() shops: Shop[];
@Input() errorMessage: string;
@Output() login: boolean = true;
  constructor(
    private shopService: ShopService,
    private loadingCtr: LoadingController,
    private alertCtr: AlertController,
    private authService: AuthService,
    private router: Router,
    private modalCtr: ModalController
    ) { }

  ngOnInit() {}
  onSubmit(form: NgForm){
    this.loadingCtr.create({
      message: 'logging in....'
    }).then( loadingEl => {
      loadingEl.present();
      for ( let i = 0; i < this.shops.length; i++) {
        if (form.value.username === this.shops[i].username && form.value.password === this.shops[i].password ) {
          setTimeout(() => {
            loadingEl.dismiss();
            // set userIsAuthenticated to true
            this.authService.login();
            this.authService.shopUsername.next(form.value.username);
            loadingEl.dismiss();
            this.router.navigate(['shop', 'myshop']);
          }, 2000);
          
        }
      }
  
     if ( this.errorMessage === 'no internet connection') {
      loadingEl.dismiss();
     this.alertCtr.create({
      header: 'No internet connection!',
      message: 'Please check your internet connection and try again later',
      buttons:[{text:'Ok',handler:()=>{this.router.navigateByUrl('shop/auth')}}]
    }).then(alertEl => alertEl.present());
     } 
      if(this.errorMessage !=='no internet connection' && !this.shops){
        loadingEl.dismiss()
        this.alertCtr.create({
          header: 'Not Found!',
          message: `No Shop With Username '${form.value.username}' exist`,
          buttons:[{text:'Ok',handler:()=>{this.router.navigateByUrl('shop/auth')}}]
        }).then(alertEl => alertEl.present());
        
      }
    

    })
    
  }
  openSignup(){
    this.modalCtr.create({component: SignupComponent}).then(modalEl => modalEl.present());
  }
}
