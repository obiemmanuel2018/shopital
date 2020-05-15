import { CustomersignupComponent } from './../customersignup/customersignup.component';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customerlogin',
  templateUrl: './customerlogin.component.html',
  styleUrls: ['./customerlogin.component.scss'],
})
export class CustomerloginComponent implements OnInit {

  constructor(private modalCtr: ModalController) { }

  ngOnInit() {}
  onSubmit() {

  }
  openSignup(){
    this.modalCtr.create({component: CustomersignupComponent}).then(modalEl => modalEl.present());

  }


}
