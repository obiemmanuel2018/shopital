import { EditModalComponent } from './edit-modal/edit-modal.component';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ShopService  } from '../shop.service';
import { NgForm } from '@angular/forms';
import { Product } from '../product';
import {LoadingController, AlertController, NavController, ModalController} from '@ionic/angular';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.page.html',
  styleUrls: ['./editproduct.page.scss'],
})
export class EditproductPage implements OnInit {
 loadedproduct: Product;
 productID: string;
 private shopUsername;
 isLoading = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    private shopService: ShopService,
    private loadingCtr: LoadingController,
    private alertCtr: AlertController,
    private navCtr: NavController,
    private authService: AuthService,
    private storage: AngularFireStorage,
    private modalCtr: ModalController
             ) { }

  ngOnInit() {
    this.authService.shopUsername.subscribe( shpUsername => {
      this.shopUsername = shpUsername;
    });
    this.activatedRoute.paramMap.subscribe(param => {
      if ( !param.has('productId')) {
        // redirect
      }
      this.productID = param.get('productId');
      this.isLoading = true;
      this.shopService.getProduct( this.productID).subscribe(product => {
      this.loadedproduct = product ;
      this.isLoading = false;
     
    },
    error => {
      this.alertCtr.create({
        header: "Can't load product!",
        message: 'Please try again later',
        buttons:[{text:'Ok',handler:()=>{this.navCtr.navigateBack('shop/myshop')}}]
      }).then(alertEl => alertEl.present());
      
    }
    ) ; } ) ;
   }
  onSubmit(title, price , description) {
  // creating a spinner while waiting for response
  this.loadingCtr.create({
  message: 'please wait....'
   }).then(loadingEl => {
  loadingEl.present();
  // check if new title is empty the assign old title to the new title
  if ( !title) {
        title = this.loadedproduct.title;
  }
  else {
        
    this.loadedproduct.title = title;
}

  // check if new price is empty the assign old price to the new price
  if (!price) {
      price = this.loadedproduct.price.toString();
  }
  // if not assign new price to old price
  else {
        
        this.loadedproduct.price = price;
    }
 // check if new description is empty the assign old description to the new description
  if (!description ) {
        description = this.loadedproduct.description;
       }
       else {
        
        this.loadedproduct.description = description;
    }
  // subcribe to update product by passing the store ID , product ID ,new price, new title ,new description
  this.shopService.updateProduct(this.productID, price, title , description ).subscribe( returnValue=>{
  //check if a 1 is return from the shop service then set a time out and dismiss the spinner
  if ( returnValue ) {
        setTimeout(() => {
          this.loadingCtr.dismiss();
  // check if no changes where made then display the message telling the user that no changes has been applied and vise versa
       this.alertCtr.create({
        header: 'Success!!',
       message:  'product updated.....'
        }).then(alertEl =>{
        alertEl.present();
        setTimeout(() => {
        alertEl.dismiss();
        }, 1500);
         })
        
        }, 500);
       
        }
        else {
          this.alertCtr.create({
            header: 'Opps!!',
            message:  'Seems something went wrong..Could not edit product'
             }).then(alertEl =>{
             alertEl.present();
             setTimeout(() => {
             alertEl.dismiss();
             }, 1500);
              })
            
        }
        });
        });  
        }
    
  onDelete(){
    //get from user a confirmation to delete product or not
    this.alertCtr.create({
      header: 'Are you sure?',
      message: 'Do you really want to delete product',
      buttons:[
        {
          text: 'cancel',
          role: 'cancel'},
      {
          text: 'Delete',
          handler:()=>{
            this.delete();
          }
      }
      ]
    }).then(alertEl => alertEl.present())
  }
// if user choose to delete..then do call the delete method
delete(){
  this.loadingCtr.create({
    message: 'Deleting product....'
  }).then( loadingEl => {
    loadingEl.present();
    // sending a delete request to firebase storage
  this.storage.storage.refFromURL(this.loadedproduct.imageUrl).delete();

  this.shopService.deleteProduct (this.productID ).subscribe( returnVal => {
      if ( returnVal ){
        setTimeout(() => {
          loadingEl.dismiss();
          this.alertCtr.create({
            message : 'Product Deleted  Successfully'
          }).then(alertEl => {
            alertEl.present();
            setTimeout(() => {
              alertEl.dismiss();
              this.navCtr.navigateBack(['shop', 'myshop']);
            }, 1500);
          })
        }, 1500);
      }
      else {
        setTimeout(() => {
          loadingEl.dismiss();
          this.alertCtr.create({
           message : 'Product Not Deleted'
          }).then(alertEl => {
          alertEl.present();
            setTimeout(() => {
            alertEl.dismiss();
             this.navCtr.navigateBack(['shop', 'myshop']);
             }, 1500);
          })
        }, 1500);
      }


    } )
    
  },
  error =>{
  
  }

  );
  
}
openModal() {
  this.modalCtr.create ({
    component: EditModalComponent
  }).then(modalEl => {
    modalEl.present();
    return modalEl.onDidDismiss();
  }).then(rspData => {
    this.onSubmit(rspData.data.title, rspData.data.price, rspData.data.description);
    
  })
  
  
}

}
