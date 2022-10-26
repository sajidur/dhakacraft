import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/modules/material/material.module';
import { MenuImgComponent } from './menu-img/menu-img.component';
import { NewsEventSliderImgComponent } from './news-event-slider-img/news-event-slider-img.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    MenuImgComponent,
    NewsEventSliderImgComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class AdminModule { }
