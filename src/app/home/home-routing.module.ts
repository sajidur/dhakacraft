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
    pathMatch: 'prefix',
    children: [
      {
        path:'',
        component: MainContantComponent,
        pathMatch : 'full'
      },
      {
        path: 'our-story',
        component:OurStoryComponent,
        pathMatch : 'full'
      },
      {
        path: 'personal-accessories',
        component:PersonalAccessoriesComponent,
        pathMatch : 'full'
      },
      {
        path: 'home',
        component: HomeMenuComponent,
        pathMatch : 'full'
      },
      {
        path: 'garden',
        component: GardenMenuComponent,
        pathMatch : 'full'
      },
      {
        path: 'christmas',
        component: ChristmasMenuComponent,
        pathMatch : 'full'
      },
      {
        path: 'news-event',
        component: NewsEventComponent,
        pathMatch : 'full'
      },
      {
        path: 'details',
        component: ImagesDetailsComponent,
        pathMatch : 'full'
      }
     
    ]
},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
