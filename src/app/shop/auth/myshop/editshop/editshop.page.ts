import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { AppComponent } from './../../../../app.component';
import { ImagemodalComponent } from './imagemodal/imagemodal.component';
import { EditshopmodalComponent } from './editshopmodal/editshopmodal.component';
import { AuthService } from './../../auth.service';
import { ShopService } from './../shop.service';
import { Component, OnInit } from '@angular/core';
import { Shop } from '../shop';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, AlertController, NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-editshop',
  templateUrl: './editshop.page.html',
  styleUrls: ['./editshop.page.scss'],
})
export class EditshopPage implements OnInit {

  constructor(private shopService: ShopService,
              private loadingCtr: LoadingController,
              private alertCtr: AlertController,
              private authService: AuthService,
              private navCtr: NavController,
              private modalCtr: ModalController,
              private appComponent: AppComponent,
              private storage: AngularFireStorage) { }
   shop: Shop[];
private shopUsername;
selectedImage: any = null;
imageSrc: string;
isLoading = false;
  ngOnInit() {
    
    // getting shopId from authservice
  
  this.authService.shopUsername.subscribe( shpUsername => {
    this.shopUsername = shpUsername;

  });
    this.shopService.getShop.subscribe( shop => {
    this.shop = shop;
    this.imageSrc = this.shop[0].imageUrl;
   
  }

  )
}
ionViewWillEnter(){

  this.shopService.fetchSingleShop(this.shopUsername).subscribe( () =>{

  });
}
  


save( newName , newAddress , newEmail , newContact, newPassword , newOwner , newImageUrl) {
 
  if ( !newName) {
    newName = this.shop[0].name;
  }
  else {
    this.shop[0].name = newName;
  }
  if ( !newAddress ) {
      newAddress =  this.shop[0].address;
  }
  else {
    this.shop[0].address = newAddress;
  }
  if ( !newEmail ) {
      newEmail =  this.shop[0].email;
  }
  else {
    this.shop[0].email = newEmail;
  }
  if ( !newContact ) {
    newContact =  this.shop[0].contact;
  }
  else {
    this.shop[0].contact = newContact;
  }


  if ( !newPassword) {
    newPassword =  this.shop[0].password;
  }
  else {
    this.shop[0].password = newPassword;
  }
  if ( !newOwner) {
    newOwner =  this.shop[0].owner;
  }
  else {
    this.shop[0].owner = newOwner;
  }
  if ( !newImageUrl) {
    newImageUrl = this.shop[0].imageUrl;
  }
  else {
    this.shop[0].imageUrl = newImageUrl;
  }
 
  // ask user for confirmation to save changes
  this.alertCtr.create({
    header: 'Are you sure?',
    message: 'Do you want to save changes',
    buttons:[
      {
        text: 'cancel',
        role: 'cancel'
       },
       {
         text: 'save',
         handler: () => {
           this.loadingCtr.create({
             message: 'Applying changes....'
           }).then(loadingEl => {
             loadingEl.present();
             // main function to be executed to save changes
             this.shopService.updateShop(this.shop[0].username, newName , newAddress , newEmail , newContact, newPassword , newOwner ,newImageUrl).subscribe( returnVal =>{
               if (returnVal) {
                
                  loadingEl.dismiss();
                  this.alertCtr.create({
                    message: 'Changes applied successfully'
                  }).then( alertEl => {
                    alertEl.present();
                    // calling the fetchShop function from app component in order for it to get be updated
                    this.appComponent.fetchShop();
                    setTimeout(() => {
                      alertEl.dismiss();
                  
                    }, 1000);
                  })

        
                 
               }
               
             },
             error =>{
              
                loadingEl.dismiss();
                this.alertCtr.create({
                  header: 'No Internet Connection!',
                  message: 'Changes applied Unsuccessfully',
                  buttons:[{text:'Ok',role:'cancel'}]
                }).then( alertEl => {
                  alertEl.present();
                })

              
             })
             
         })
       }
      }
      ]
  }).then( alertEl => alertEl.present());
}
selectPreview(event: any) {
  
  if ( event.target.files && event.target.files[0]) {
     const reader = new FileReader();
     reader.onload = (e: any) => this.imageSrc = e.target.result;
     reader.readAsDataURL(event.target.files[0]);
     this.selectedImage = event.target.files[0];
  }
  else {
    this.imageSrc = 'assets/img/profile_default.png';
    this.selectedImage = null;
  }
}
onUpload(){
  this.loadingCtr.create({
    message: 'please wait....'
  }).then(loadEl => {
    loadEl.present();
    var filePath = `${this.shopUsername}/shopUrl/${ this.selectedImage.name}`;
  var fileRef = this.storage.ref(filePath);
  this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
    finalize ( () => {
  
      fileRef.getDownloadURL().subscribe( (url) => {
        loadEl.dismiss();
        this.save(null , null , null, null, null, null, url);
       } )
       } ) 
  ).subscribe( rsp => {
    console.log((rsp.bytesTransferred / rsp.totalBytes) * 100 +'%');
    var x = (rsp.bytesTransferred / rsp.totalBytes) * 100 ;

  });
  })
  

}
openModal() {
   this.modalCtr.create({
     component: EditshopmodalComponent,
     componentProps: {shop: this.shop}
    }).then(modalEl => {
      modalEl.present();
      return modalEl.onDidDismiss();
    }).then(rspData => {
      if(rspData.data) {
        this.save(rspData.data.name ,rspData.data.address ,rspData.data.email , rspData.data.contact ,rspData.data.password ,rspData.data.owner ,this.shop[0].imageUrl)
      }
    
    })
}
openImageModal() {
  this.modalCtr.create({
    component: ImagemodalComponent,
    componentProps: {imageUrl: this.imageSrc}
  }).then(modalEl => modalEl.present())
}
}
