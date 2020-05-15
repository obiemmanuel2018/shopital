import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
      path:'',redirectTo:'shop',pathMatch:'full'
    },
    {
      path: 'shop',
      loadChildren: () => import('./shop/shop.module').then( m => m.ShopPageModule)
    },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
