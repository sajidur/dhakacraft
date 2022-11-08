import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/modules/material/material.module';
import { MenuImgComponent } from './menu-img/menu-img.component';
import { NewsEventSliderImgComponent } from './news-event-slider-img/news-event-slider-img.component';
import { DevExtremeModule } from '../shared/modules/dev-extreme/dev-extreme.module';
import { AddMenuImgComponent } from './add-menu-img/add-menu-img.component';
import { AddNewsEventSliderImgComponent } from './add-news-event-slider-img/add-news-event-slider-img.component';
import { ProductImgComponent } from './product-img/product-img.component';
import { AddProductImgComponent } from './add-product-img/add-product-img.component';
import { AdminHomeMenuComponent } from './admin-home-menu/admin-home-menu.component';
import { AddAdminHomeMenuComponent } from './add-admin-home-menu/add-admin-home-menu.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    MenuImgComponent,
    NewsEventSliderImgComponent,
    AddMenuImgComponent,
    AddNewsEventSliderImgComponent,
    ProductImgComponent,
    AddProductImgComponent,
    AdminHomeMenuComponent,
    AddAdminHomeMenuComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    DevExtremeModule
  ]
})
export class AdminModule { }
