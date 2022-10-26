import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { MenuImgComponent } from './menu-img/menu-img.component';
import { NewsEventSliderImgComponent } from './news-event-slider-img/news-event-slider-img.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,

    children: [
      {
        path: '', redirectTo: 'menu-img', pathMatch: 'full'
      },
      {
        path: 'menu-img',
        component: MenuImgComponent
      },
      {
        path: 'news-event-slider',
        component: NewsEventSliderImgComponent
      }
 
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
