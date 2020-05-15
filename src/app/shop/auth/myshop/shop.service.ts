
import { Injectable } from '@angular/core';
import { Shop } from './shop';
import { BehaviorSubject, pipe } from 'rxjs';
import { take, map, tap, filter, concat, delay, subscribeOn, switchMap } from 'rxjs/operators';
import { Product } from './product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  

  shop: Shop[];
  private product: Product[];
   FirebaseShopId: string;
  // all shops
  private Shops = new BehaviorSubject<Shop[]>([]);

 
  constructor(private http: HttpClient) { }
  // get a single shop by subscribing
  // my http requests
  CreateShop(Username: string , Password: string, Name: string , Address: string, Email: string, Contact: string , Owner: string) {
   // to work on this later

   
    const newShop = {
      id: null,
      username: Username,
      password: Password,
      name: Name,
      address: Address,
      email: Email,
      contact: Contact,
      owner: Owner,
      imageUrl: 'assets/img/IMG-20200102-WA0016 (2).jpg',
      products:[ ]
    }
   return this.http.post<{name: string}>('https://shop-87b4a.firebaseio.com/shops.json',{...newShop}).pipe(
     switchMap( Response => {
       console.log(Response.name);
       return this.getShop;
     }),
     take(1),
     tap( shop => {
       this.Shops.next(shop.concat(newShop));
     })
   );
   
  }


  // fetching all shops

  fetchShop(shopUsername: string) {
  return  this.http.get('https://shop-87b4a.firebaseio.com/shops.json').pipe(
      map( rspData => {
        console.log(rspData);
        const Shop = [];
        for (const key in rspData) {
          if (rspData[key].username === shopUsername){
            this.FirebaseShopId = key;
          }
         
          if ( rspData.hasOwnProperty(key)) {
            Shop.push(
              
                 {
                   id: this.FirebaseShopId,
                   username: rspData[key].username,
                   name: rspData[key].name, 
                   password: rspData[key].password,
                   email: rspData[key].email,
                   contact: rspData[key].contact,
                   address: rspData[key].address ,
                   owner: rspData[key].owner ,
                   imageUrl: rspData[key].imageUrl,
                   products: rspData[key].products
                     
                 }

              )
          }
        }

        
          
          return Shop;
        
      }),
      tap( Shop => {
  
        this.Shops.next(Shop);
        
      })

    );

  }

  // get a single shop
  fetchSingleShop(shopUsername: string) {
    return  this.http.get(`https://shop-87b4a.firebaseio.com/shops.json?orderBy="username"&equalTo="${shopUsername}"`).pipe(
        map( rspData => {
          console.log(rspData);
          const Shop = [];
          for (const key in rspData) {
            this.FirebaseShopId = key;
              if ( rspData.hasOwnProperty(key)) {
                Shop.push(
                  
                     {
                       id: key,
                       username: rspData[key].username,
                       name: rspData[key].name, 
                       password: rspData[key].password,
                       email: rspData[key].email,
                       contact: rspData[key].contact,
                       address: rspData[key].address ,
                       owner: rspData[key].owner ,
                       imageUrl: rspData[key].imageUrl,
                       products: rspData[key].products
                         
                     }
    
                  )
              
            }
           
            
          }
  
          
            
            return Shop;
          
        }),
        tap( Shop => {
    
          this.Shops.next(Shop);
          
        })
  
      );
  
    }
  


 get getShop() {

  return this.Shops.asObservable();
}


// edit shop
updateShop(newUsername , newName , newAddress , newEmail , newContact  , newPassword , newOwner, newImageUrl) {
  let updateShop;
  return this.Shops.pipe(
    take(1),
    switchMap( (shop) => {
      updateShop = {
        id:null,
        username: newUsername,
        name: newName,
        password: newPassword,
        email: newEmail,
        imageUrl: newImageUrl,
        contact: newContact,
        address: newAddress,
        owner: newOwner,
        products: shop[0].products
      }
     
      
      return this.http.put(`https://shop-87b4a.firebaseio.com/shops/${this.FirebaseShopId}.json`,{...updateShop});

       
    }
    ),
    tap( ()=> {
      return this.getShop.pipe(take(1)).subscribe(shops => {
        this.Shops.next(shops.concat(updateShop));
    })
  })
  )
    

}
getProduct(productId) {
return this.http.get(`https://shop-87b4a.firebaseio.com/shops/${this.FirebaseShopId}/products.json`).pipe(
  map( products => {
    let product = <Product[]>products;
    return product.find(prdt => prdt.id === productId );
  })
)

}
// update a product
updateProduct( productId: string, newPrice: string, newTitle: string , newDescription: string) {

  return this.Shops.pipe(
    take(1),
    switchMap( (shop) => {
      
      this.product = [shop[0].products.find( prdt => prdt.id === productId  )];
      this.product[0].price = +newPrice;
      this.product[0].title = newTitle;
      this.product[0].description = newDescription;

      return  this.http.put(`https://shop-87b4a.firebaseio.com/shops/${this.FirebaseShopId}/products.json`,{...shop[0].products});
    
    } ),
    tap( ()=> {
      return this.getShop.pipe(take(1)).subscribe(shops => {
        this.Shops.next(shops);
        if (this.product ) {
          return 1;
        }
        else {
          return 0;
        }
    })
  })


);
}
// deleting a product

deleteProduct( productId: string ) {
  let updateShop;
  return this.Shops.pipe(
    take(1),
    switchMap( (shop) => {
      shop[0].products = shop[0].products.filter(prd => prd.id !== productId);
      updateShop = {
        id:null,
        username: shop[0].username,
        name: shop[0].name,
        password: shop[0].password,
        email: shop[0].email,
        contact: shop[0].contact,
        address: shop[0].address,
        owner: shop[0].owner,
        imageUrl: shop[0].imageUrl,
        products: shop[0].products
      }
      
      return  this.http.put(`https://shop-87b4a.firebaseio.com/shops/${this.FirebaseShopId}.json`,{...updateShop});
    
    } ),
    tap( ()=> {
      return this.getShop.pipe(take(1)).subscribe(shops => {
        this.Shops.next(shops.concat(updateShop));
        if (this.product ) {
          return 1;
        }
        else {
          return 0;
        }
    })
  })


);
}
// upload a new product 

uploadProduct(newProduct) {
  
  let updateProducts = [];
  return this.Shops.pipe(
    take(1),
    switchMap( shop => {
      
      if( !shop[0].products ) {
        shop[0].products = [];
      }
      else {
        shop[0].products =  shop[0].products;
      }
       shop[0].products.push(newProduct);
      updateProducts =  shop[0].products;
      return  this.http.put(`https://shop-87b4a.firebaseio.com/shops/${this.FirebaseShopId}/products.json`,{...updateProducts});
    
    } ),
    tap( ()=> {
      return this.getShop.pipe(take(1)).subscribe(shops => {
        this.Shops.next(shops);
    })
  })


);

}

}
