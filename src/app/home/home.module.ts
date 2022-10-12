import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainContantComponent } from './main-contant/main-contant.component';
import { OurStoryComponent } from './our-story/our-story.component';
import { PersonalAccessoriesComponent } from './personal-accessories/personal-accessories.component';
import { HomeMenuComponent } from './home-menu/home-menu.component';


@NgModule({
  declarations: [
    HomeComponent,
    MainContantComponent,
    OurStoryComponent,
    PersonalAccessoriesComponent,
    HomeMenuComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
