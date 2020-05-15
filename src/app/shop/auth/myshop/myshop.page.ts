import { AppComponent } from './../../../app.component';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { AuthService } from './../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ShopService } from './shop.service';
import { Shop } from './shop';
import { take, subscribeOn } from 'rxjs/operators';
import { Product } from './product';


@Component({
  selector: 'app-myshop',
  templateUrl: './myshop.page.html',
  styleUrls: ['./myshop.page.scss'],
})
export class MyshopPage implements OnInit {
  shop: Shop[];
  products: Product[];
  private shopUsername ;
  isLoading: boolean = false;


  constructor(
    private shopService: ShopService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private loadingCtr: LoadingController,
    private alertCtr: AlertController,
    private router: Router,
    private navCtr: NavController,
    private appComponent: AppComponent) {}

    ngOnInit() {
      // get shop usernamefrom the active URL
       // get shop
       this.authService.shopUsername.subscribe(shpUsername => {
        this.shopUsername = shpUsername;
      });
      this.isLoading = true;
       this.shopService.getShop.subscribe( shop => {
        this.isLoading = false;
         this.shop = shop;
         this.products = shop[0].products;
      
         

}
);
        
    }
    ionViewWillEnter() {
      this.isLoading = true;
  
       this.shopService.fetchSingleShop(this.shopUsername).subscribe( () =>{
         this.isLoading = false;
        },
        error => {
          this.alertCtr.create({
           header: 'No internet connection!',
            message: 'Please check your internet connection and try again later',
            buttons:[
              {text:'Ok', handler:()=>{
                this.ionViewWillEnter();
                this.appComponent.fetchShop();
              }}
            ]
         }).then(alertEl =>{
            alertEl.present();
            
         }
       );
          
        } );
        

     
     
    }
    




}
