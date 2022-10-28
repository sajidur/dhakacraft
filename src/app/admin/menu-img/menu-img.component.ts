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

  delete = (Id: any) => {
    Swal.fire({
      icon: 'warning',
      html: `Are you sure do you want to delete it?`,
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#28a745',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No, Thanks',
    }).then((result) => {
      if (result.isConfirmed) {
        // this.deleteNewsEventSlider(Id);
      }
    });
  }

  deleteNewsEventSlider = (Id: any) => {
    this.utilitiesSrv.deleteNewsEventSliderById(Id).subscribe({
      next: (result) => {
        this.spinner.hide();
        console.log('deleteRes', result);
        if(result) {
          this.getAllCategory()
        }
      },
      error: (err) => {
        this.spinner.hide();
        console.log('deleteErr', err);
      },
    });
  }

}
