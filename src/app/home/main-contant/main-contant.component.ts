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
  newsAndEventList: any[] = [];
  slidingList: any[] = [];
  imgConfigList: any[] = [];
  socialImpact: any[] = [];
  memberShip: any[] = [];
  requestCatalog: any[] = []
  productList: any[] = [];
  pageContent: any[] = [];

  constructor(
    public router: Router,
    public utilitiesSrv: UtilitiesService,
    public globalSrv: GlobalService
  ) { 

  }

  ngOnInit(): void {
   this.currentPushSubscription();
   this.getAllImageConfig();
  //  this.getProductByCategoryId();
   this.getAllPageContent();
   this.getAllCategory()
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

  getAllCategory = () => {
    // this.spinner.show();
    this.utilitiesSrv.getAllCategory().subscribe({
      next: (result) => {
        // this.spinner.hide();
        console.log('categoryListRes', result);
        if(result) {
          // this.categoryList = result;
          const categoryObj = result.find((e: any) => e.MenuId === 5)
          if(categoryObj) {
            this.getProductByCategoryId(categoryObj?.Id)
          }
        }
      },
      error: (err) => {
        // this.spinner.hide();
        console.log('categoryListErr', err);
      },
    });
  }

  goToNewsAndEventDetails = (Id: any) => {
    // this.router.navigateByUrl('news-event?id=' + Id + '&as=' + as + '&cd=' + cd);
    this.router.navigateByUrl('news-event?Id=' + Id);
  }

  getProductByCategoryId = (Id: any) => {
    // this.spinner.show();
    this.productList = [];
    this.utilitiesSrv.getProductByCategoryId(Id).subscribe({
      next: (result) => {
        // this.spinner.hide();
        console.log('ProductListRessss', result);
        if (result) {
          this.productList = result;
        }
      },
      error: (err) => {
        // this.spinner.hide();
        console.log('ProductListErr', err);
      },
    });
  };

  getAllImageConfig = () => {
    // this.spinner.show();
    this.utilitiesSrv.getAllImageConfig().subscribe({
      next: (result) => {
        // this.spinner.hide();
        console.log('imgConfigListRes', result);
        if(result) {
          this.imgConfigList = result;
          this.socialImpact = this.imgConfigList.filter(e => e.ImagePosition === 'Social Impact')
          this.memberShip = this.imgConfigList.filter(e => e.ImagePosition === 'Membership')
          this.requestCatalog = this.imgConfigList.filter(e => e.ImagePosition === 'Request Catalog')
        }
      },
      error: (err) => {
        // this.spinner.hide();
        console.log('imgConfigListErr', err);
      },
    });
  }

  productDetails = (Id: any) => {
    this.router.navigateByUrl(`details?productId=${Id}`);
  };

  getAllPageContent = () => {
    // this.spinner.show();
    this.utilitiesSrv.getAllPageContent().subscribe({
      next: (result) => {
        // this.spinner.hide();
        console.log('pageListRes', result);
        if(result.length) {
          this.pageContent = result.filter((e: any) => e.PageName === 'Who We Are');
        }
      },
      error: (err) => {
        // this.spinner.hide();
        console.log('pageListErr', err);
      },
    });
  }

}
