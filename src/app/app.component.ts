import { ShopService } from './shop/auth/myshop/shop.service';
import { AuthService } from './shop/auth/auth.service';
import { Component } from '@angular/core';

import { Platform, NavController, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
   shopUserName;
   shop = [];
   isLoading = false;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private navCtr: NavController,
    private loadingCtr: LoadingController,
    private shopService: ShopService,
  ) {
    this.initializeApp();
    this.fetchShop();
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      
    });
  }
// fetching shop details 
fetchShop() {
  this.isLoading = true;
    this.authService.shopName.subscribe(username=> {
    this.shopUserName = username; 
    this.shopService.fetchSingleShop(this.shopUserName).subscribe(shop => {
      this.shop = shop;
      console.log(this.shop);
      
      if(this.shop.length === 0) {
        this.isLoading = true;
      
        
      }
      else {
        this.isLoading = false;
      }
      
     })
    })
  
}
  Onlogout(){
    this.authService.logout();
    this.loadingCtr.create({
      message: 'logging out...'
    }).then( loadingEl => {
      loadingEl.present();
      setTimeout(() => {
        loadingEl.dismiss();
        this.navCtr.navigateRoot('shop/auth');
      }, 1500);
    })
   
  }
}
