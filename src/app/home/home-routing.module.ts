import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeMenuComponent } from './home-menu/home-menu.component';
import { HomeComponent } from './home/home.component';
import { MainContantComponent } from './main-contant/main-contant.component';
import { OurStoryComponent } from './our-story/our-story.component';
import { PersonalAccessoriesComponent } from './personal-accessories/personal-accessories.component';

const routes: Routes = [
{ 
    path: '', component: HomeComponent,
    children: [
      // {
      //   path:'',
      //   redirectTo: 'home',
      //   pathMatch:'full'
      // },
      {
        path:'',
        component: MainContantComponent
      },
      {
        path: 'our-story',
        component:OurStoryComponent
      },
      {
        path: 'personal-accessories',
        component:PersonalAccessoriesComponent
      },
      {
        path: 'home',
        component: HomeMenuComponent
      }
     
    ]
  
},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
