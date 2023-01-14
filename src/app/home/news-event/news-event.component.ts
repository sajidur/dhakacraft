import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { GlobalService } from 'src/app/services/global/global.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';

@Component({
  selector: 'app-news-event',
  templateUrl: './news-event.component.html',
  styleUrls: ['./news-event.component.scss']
})
export class NewsEventComponent implements OnInit {
  
  private subscriptions: Array<Subscription> = [];
  newsEventSlideList: any[] = [];
  newsEventSlideObj: any;
  Id: number;

  constructor(
    public utilitiesSrv: UtilitiesService,
    public route: ActivatedRoute,
    public globalSrv: GlobalService
  ) { 
    this.getQueryParams()
  }

  ngOnInit(): void {
    this.currentPushSubscription()
   }

 
   ngOnDestroy() {
     console.log('destroy.....')
     // this.utilitiesSrv.newsEventSliderList.next(null);
     this.subscriptions.forEach((subscription: Subscription) => {
       subscription.unsubscribe();
     });
   }
 
   currentPushSubscription() {
     this.subscriptions.push(
       this.utilitiesSrv.newsEventSliderListCast.subscribe((result) => {
       //  console.log(result)
        this.newsEventSlideList = result
        this.newsEventSlideObj =  this.newsEventSlideList.find(e => e.Id === this.Id)
        console.log(this.newsEventSlideObj)
       })
     );
   }

   getQueryParams = () => {
    this.route.queryParams.subscribe((params) => {
      if (params['Id']) {
        this.Id = Number(params['Id'])
 
      }
    });
   }

  //  imageUrlGet = (url: any) => {
  //   // console.log(this.globalSrv.imageUrlGet(url))
  //   return this.globalSrv.imageUrlGet(url)
  //  }

}
