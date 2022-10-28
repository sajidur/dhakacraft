import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GlobalService } from 'src/app/services/global/global.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';

@Component({
  selector: 'app-main-contant',
  templateUrl: './main-contant.component.html',
  styleUrls: ['./main-contant.component.scss']
})
export class MainContantComponent implements OnInit {

  private subscriptions: Array<Subscription> = [];
  newsEventSlideList: any[] = [];
  newsAndEventList: any[];
  slidingList: any[];

  constructor(
    public router: Router,
    public utilitiesSrv: UtilitiesService,
    public globalSrv: GlobalService
  ) { 

  }

  ngOnInit(): void {
   this.currentPushSubscription()
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
       if(this.newsEventSlideList?.length) {
        this.slidingList = this.newsEventSlideList.filter(e => e.Type === 'Main Slider')
        this.newsAndEventList = this.newsEventSlideList.filter(e => e.Type === 'News and Event')
        console.log('fffff',this.newsAndEventList)
       }
      })
    );
  }

  goToNewsAndEventDetails = (Id: any) => {
    // this.router.navigateByUrl('news-event?id=' + Id + '&as=' + as + '&cd=' + cd);
    this.router.navigateByUrl('news-event?Id=' + Id);
  }

}
