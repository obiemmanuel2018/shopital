import { ImagemodalComponent } from './imagemodal/imagemodal.component';
import { EditshopmodalComponent } from './editshopmodal/editshopmodal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditshopPageRoutingModule } from './editshop-routing.module';

import { EditshopPage } from './editshop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditshopPageRoutingModule
  ],
  declarations: [EditshopPage, EditshopmodalComponent, ImagemodalComponent],
  entryComponents: [EditshopmodalComponent, ImagemodalComponent]
})
export class EditshopPageModule {}
