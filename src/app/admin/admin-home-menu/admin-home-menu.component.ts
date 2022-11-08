import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global/global.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-home-menu',
  templateUrl: './admin-home-menu.component.html',
  styleUrls: ['./admin-home-menu.component.scss']
})
export class AdminHomeMenuComponent implements OnInit {

  rowSize =10
  newsEventSlideList: any[] = [];

  constructor(
    public utilitiesSrv: UtilitiesService,
    public spinner: NgxSpinnerService,
    public globalSrv: GlobalService
  ) {}

  ngOnInit(): void {
    // this.getAllNewsEventSlider()
  }

  //upload image
  // upload = () => {
  //   this.spinner.show();
  //   this.utilitiesSrv.uploadFile(this.file).subscribe({
  //     next: (result) => {
  //       this.spinner.hide();
  //       console.log('imgUploadRes', result);
  //       this.model.ImageUrl = result
  //     },
  //     error: (err) => {
  //       this.spinner.hide();
  //       console.log('imgUploadErr', err);
  //     },
  //   });
  // };

  // typeOptionChange = (e: any) => {};

 
  getAllNewsEventSlider = () => {
    this.spinner.show();
    this.utilitiesSrv.getAllNewsEventSliderImg().subscribe({
      next: (result) => {
        this.spinner.hide();
        console.log('newsListRes', result);
        if(result) {
          this.newsEventSlideList = result;
        }
      },
      error: (err) => {
        this.spinner.hide();
        console.log('newsListErr', err);
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
        this.deleteNewsEventSlider(Id);
      }
    });
  }

  deleteNewsEventSlider = (Id: any) => {
    this.utilitiesSrv.deleteNewsEventSliderById(Id).subscribe({
      next: (result) => {
        this.spinner.hide();
        console.log('deleteRes', result);
        if(result) {
          this.getAllNewsEventSlider()
        }
      },
      error: (err) => {
        this.spinner.hide();
        console.log('deleteErr', err);
      },
    });
  }

  // clearField = () => {
  //   ValidationEngine.resetGroup('validationGrp');
  // };

}
