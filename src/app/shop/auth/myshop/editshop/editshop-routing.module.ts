import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditshopPage } from './editshop.page';

const routes: Routes = [
  {
    path: '',
    component: EditshopPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditshopPageRoutingModule {}
