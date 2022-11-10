import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/services/global/global.service';
import { MenuControllerService } from 'src/app/services/menu-controller/menu-controller.service';

@Component({
  selector: 'app-our-story',
  templateUrl: './our-story.component.html',
  styleUrls: ['./our-story.component.scss']
})
export class OurStoryComponent implements OnInit {
  homeMenu: any = {};

  constructor(
    public menuControllerSrv: MenuControllerService,
    public route: ActivatedRoute,
    public globalSrv: GlobalService
    ) { }

  ngOnInit(): void {
    this.getQueryParams();
  }

  getQueryParams = () => {
    this.route.queryParams.subscribe((params) => {
      if (params['Id']) {
        let Id = Number(params['Id']);
        // this.getProductById(Id);
       this.homeMenu = this.menuControllerSrv.ourStoryMenuItem 
      }
    });
  };

}
