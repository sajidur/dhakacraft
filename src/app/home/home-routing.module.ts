import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChristmasMenuComponent } from './christmas-menu/christmas-menu.component';
import { GardenMenuComponent } from './garden-menu/garden-menu.component';
import { HomeMenuComponent } from './home-menu/home-menu.component';
import { HomeComponent } from './home/home.component';
import { ImagesDetailsComponent } from './images-details/images-details.component';
import { MainContantComponent } from './main-contant/main-contant.component';
import { NewsEventComponent } from './news-event/news-event.component';
import { OurStoryComponent } from './our-story/our-story.component';
import { PersonalAccessoriesComponent } from './personal-accessories/personal-accessories.component';

const routes: Routes = [
{ 
    path: '', component: HomeComponent,
    children: [
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
      },
      {
        path: 'garden',
        component: GardenMenuComponent
      },
      {
        path: 'christmas',
        component: ChristmasMenuComponent
      },
      {
        path: 'news-event',
        component: NewsEventComponent
      },
      {
        path: 'details',
        component: ImagesDetailsComponent
      }
     
    ]
  
},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
