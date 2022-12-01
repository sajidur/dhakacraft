import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global/global.service';
import { MenuControllerService } from 'src/app/services/menu-controller/menu-controller.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';

@Component({
  selector: 'app-home-menu',
  templateUrl: './home-menu.component.html',
  styleUrls: ['./home-menu.component.scss'],
})
export class HomeMenuComponent implements OnInit {

  productList: any[] = [];

  constructor(
    public utilitiesSrv: UtilitiesService,
    public router: Router,
    public spinner: NgxSpinnerService,
    public globalSrv: GlobalService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getQueryParams();
  }

  getQueryParams = () => {
    this.route.queryParams.subscribe((params) => {
      if (params['categoryId']) {
        let Id = Number(params['categoryId']);
        this.getProductById(Id);
      }
    });
  };

  getProductById = (Id: any) => {
    // this.spinner.show();
    this.productList = [];
    this.utilitiesSrv.getProductByCategoryId(Id).subscribe({
      next: (result) => {
        // this.spinner.hide();
        console.log('ProductListRes', result);
        if (result && result?.length) {
          this.productList = result;
        }
      },
      error: (err) => {
        // this.spinner.hide();
        console.log('ProductListErr', err);
      },
    });
  };

  productDetails = (Id: any) => {
    this.router.navigateByUrl(`details?productId=${Id}`);
  };
}
