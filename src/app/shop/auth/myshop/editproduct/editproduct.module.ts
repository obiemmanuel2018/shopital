import { EditModalComponent } from './edit-modal/edit-modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditproductPageRoutingModule } from './editproduct-routing.module';

import { EditproductPage } from './editproduct.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditproductPageRoutingModule
  ],
  declarations: [EditproductPage, EditModalComponent],
  entryComponents: [EditModalComponent]
})
export class EditproductPageModule {


  onSubmit(form: NgForm) {

  }
}
