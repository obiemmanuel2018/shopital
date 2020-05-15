import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userIsAuthenticated =  false;
  shopUsername = new BehaviorSubject<string[]>([]);
  constructor() { 

  }
  get shopName() {
        return this.shopUsername.asObservable();
  }
  get isAuthenticated() {
    return this.userIsAuthenticated;
  }
  login() {
    this.userIsAuthenticated = true;
  }
  logout() {
    this.userIsAuthenticated = false;
  }
}
