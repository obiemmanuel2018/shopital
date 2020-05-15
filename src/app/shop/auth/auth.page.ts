
import { NavController, AlertController, ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';
import { ShopService } from './myshop/shop.service';
import { Shop } from './myshop/shop';



@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
private shops: Shop[];
private shopUsername: string;
segmentInitialised: string;
errorMessage: string;
currentSegment: string;
isLoading = false;
  constructor(private shopService: ShopService,
              private navCtr: NavController,
              private alertCtr: AlertController,
              private modalCtr: ModalController
              
            
      ) { }

  ngOnInit() {
    



    this.shopService.getShop.subscribe( shops => {
      this.shops = shops;
      
      
    });
    
  }
  ionViewWillEnter() {

    this.segmentInitialised = "MyShop"
  this.isLoading = true;
  this.shopService.fetchShop(this.shopUsername).subscribe( x => {
    this.isLoading = false;
  },
    error => {
      this.alertCtr.create({
        header: 'No internet connection!',
        message: 'Please check your internet connection and try again later',
        buttons:[{text:'Ok',handler:()=>{
          this.errorMessage = 'no internet connection';
          this.ionViewWillEnter();
          }}]
      }).then(alertEl => alertEl.present());
      
    }

  );
 
 
}

segmentChange(event: any){
this.currentSegment = event.detail.value;
}


}
