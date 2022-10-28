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

  constructor(
    public utilitiesSrv: UtilitiesService,
    public route: ActivatedRoute,
    public globalSrv: GlobalService
  ) { }

  ngOnInit(): void {
    this.currentPushSubscription()
    this.getQueryParams()
   }
 
   ngOnDestroy() {
     console.log()
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
       })
     );
   }

   getQueryParams = () => {
    this.route.queryParams.subscribe((params) => {
      if (params['Id']) {
        let Id = Number(params['Id'])
       this.newsEventSlideObj =  this.newsEventSlideList.find(e => e.Id === Id)
       console.log(this.newsEventSlideObj)
      }
    });
   }

   imageUrlGet = (url: any) => {
    console.log(this.globalSrv.imageUrlGet(url))
    return this.globalSrv.imageUrlGet(url)
   }

}
