import { Product } from './../product';
import { HttpClient } from '@angular/common/http';
import { LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from './../../auth.service';
import { ShopService } from './../shop.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, tap } from 'rxjs/operators';
import { database } from 'firebase';


@Component({
  selector: 'app-newproduct',
  templateUrl: './newproduct.page.html',
  styleUrls: ['./newproduct.page.scss'],
})
export class NewproductPage implements OnInit {
imageSrc: string = 'assets/img/Aloko.jpg';
selectedImage: File = null;
selectedImageType: string;
hasSelectedImage : boolean = false;
shopUsername: string[];
newProduct;
  constructor
  (
    private shopService: ShopService,
    private authService: AuthService,
    private loadingCtr: LoadingController,
    private alertCtr: AlertController,
    private http: HttpClient,
    private storage: AngularFireStorage
    ) { }

  ngOnInit() {
    this.authService.shopUsername.subscribe(shpUsername => {
      this.shopUsername = shpUsername;
    })
    

  }
onSubmit(data: NgForm) {
  console.log(data);
  
  data.form.value.id = Math.random().toString + this.shopUsername[0] + data.form.value.title;
  data.form.value.image = this.imageSrc;
  this.loadingCtr.create({
    message: 'please wait....'
  }).then(loadingEl => {
    loadingEl.present();
    console.log(data.form.value.image);
    
    
    // uploading image to firebase
    var filePath = `${this.shopUsername}/Products/Images${ this.selectedImage.name}`;
    var fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
      finalize( () => {
       fileRef.getDownloadURL().subscribe( (url) => {
       
       var description =  data.form.value.description;
       var id = data.form.value.id;
       var imageUrl = url;
       var price = data.form.value.price;
       var title = data.form.value.title
       this.newProduct = {
         description,
         id,
         imageUrl,
         price,
         title
       };
       this.shopService.uploadProduct(this.newProduct).subscribe( x => {
        if( x) {
          loadingEl.dismiss();
          this.alertCtr.create({
            message: 'Product uploaded',
            buttons:[{text:'Ok',role:'cancel'}]
          }).then( alertEl => alertEl.present())
        }
        else {
          loadingEl.dismiss();
          this.alertCtr.create({
            message: 'Product NOT uploaded',
            buttons:[{text:'Ok',role:'cancel'}]
          }).then( alertEl => alertEl.present())
        }
       });
      })
      }) 
    ).subscribe( rsp => {
      console.log((rsp.bytesTransferred / rsp.totalBytes) * 100 +'%');
      var x = (rsp.bytesTransferred / rsp.totalBytes) * 100 ;
     
      
    });
   
  } )
 
  
   
}
selectPreview(event: any) {
  this.hasSelectedImage = true;
  console.log(event.target.files[0].type);
  this.selectedImageType =  event.target.files[0].type;
  
  if ( event.target.files && event.target.files[0]) {
     const reader = new FileReader();
     reader.onload = (e: any) => this.imageSrc = e.target.result;
     reader.readAsDataURL(event.target.files[0]);
     this.selectedImage = <File>event.target.files[0];
  }
  else {
    this.imageSrc = 'assets/img/Aloko.jpg';
    this.selectedImage = null;
  }
}
}
