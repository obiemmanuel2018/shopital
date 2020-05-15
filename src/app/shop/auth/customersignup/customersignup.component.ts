import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customersignup',
  templateUrl: './customersignup.component.html',
  styleUrls: ['./customersignup.component.scss'],
})
export class CustomersignupComponent implements OnInit {

  constructor(private modalCtr: ModalController) { }

  ngOnInit() {}
onSignup(){

}
onClose(){
this.modalCtr.dismiss();
}
}
