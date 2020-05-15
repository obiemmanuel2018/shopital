import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent implements OnInit {

  constructor(private modalCtr: ModalController) { }

  ngOnInit() {}
  onSubmit(form: NgForm) {
    this.modalCtr.dismiss(form.value);
  }
  onClose(){
    this.modalCtr.dismiss();
  }

}
