import { Shop } from './../../shop';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-editshopmodal',
  templateUrl: './editshopmodal.component.html',
  styleUrls: ['./editshopmodal.component.scss'],
})
export class EditshopmodalComponent implements OnInit {
@Input() shop: Shop;
  constructor(private modalCtr: ModalController
    ) { }

  ngOnInit() {}
  onSubmit(form: NgForm) {
    if (!form.value) {
      this.modalCtr.dismiss();
    }
    else {
      this.modalCtr.dismiss(form.value);
    }
   
    
  }
  onClose() {
     this.modalCtr.dismiss();
  }
}
