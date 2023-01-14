import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAdminHomeMenuComponent } from './add-admin-home-menu/add-admin-home-menu.component';
import { AddImgConfigComponent } from './add-img-config/add-img-config.component';
import { AddMenuImgComponent } from './add-menu-img/add-menu-img.component';
import { AddNewsEventSliderImgComponent } from './add-news-event-slider-img/add-news-event-slider-img.component';
import { AddProductImgComponent } from './add-product-img/add-product-img.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminHomeMenuComponent } from './admin-home-menu/admin-home-menu.component';
import { ImgConfigComponent } from './img-config/img-config.component';
import { MenuImgComponent } from './menu-img/menu-img.component';
import { NewsEventSliderImgComponent } from './news-event-slider-img/news-event-slider-img.component';
import { ProductImgComponent } from './product-img/product-img.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    children: [
      {
        path: '', redirectTo: 'home-menu',
        pathMatch : 'full', 
      },
      {
        path: 'menu',
        component: MenuImgComponent
      },
      {
        path: 'add-menu',
        component: AddMenuImgComponent
      },
      {
        path: 'news-event-slider',
        component: NewsEventSliderImgComponent
      },
      {
        path: 'add-news-event-slider',
        component: AddNewsEventSliderImgComponent
      },
      {
        path: 'product',
        component: ProductImgComponent
      },
      {
        path: 'add-product',
        component: AddProductImgComponent
      },
      {
        path: 'home-menu',
        component: AdminHomeMenuComponent
      },
      {
        path: 'add-home-menu',
        component: AddAdminHomeMenuComponent
      },
      {
        path: 'img-config',
        component: ImgConfigComponent
      },
      {
        path: 'add-img-config',
        component: AddImgConfigComponent
      }
 
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
