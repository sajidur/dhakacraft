import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global/global.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu-img',
  templateUrl: './menu-img.component.html',
  styleUrls: ['./menu-img.component.scss']
})
export class MenuImgComponent implements OnInit {

  rowSize =10
  categoryList: any[] = [];


  constructor(
    public utilitiesSrv: UtilitiesService,
    public spinner: NgxSpinnerService,
    public globalSrv: GlobalService
  ) { }

  ngOnInit(): void {
    this.getAllCategory()
  }

  getAllCategory = () => {
    this.spinner.show();
    this.utilitiesSrv.getAllCategory().subscribe({
      next: (result) => {
        this.spinner.hide();
        console.log('categoryListRes', result);
        if(result) {
          this.categoryList = result;
        }
      },
      error: (err) => {
        this.spinner.hide();
        console.log('categoryListErr', err);
      },
    });
  }



}
