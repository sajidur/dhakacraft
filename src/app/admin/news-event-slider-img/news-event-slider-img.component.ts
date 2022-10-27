import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import Swal from 'sweetalert2';
import ValidationEngine from 'devextreme/ui/validation_engine';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-news-event-slider-img',
  templateUrl: './news-event-slider-img.component.html',
  styleUrls: ['./news-event-slider-img.component.scss'],
})
export class NewsEventSliderImgComponent implements OnInit {
  file: any;
  typeList = [
    { id: 1, name: 'Topbar' },
    { id: 2, name: 'News & Event' },
    { id: 3, name: 'Sliding' },
  ];
  model: any = {
    Type: null,
    Headline: null,
    ImageUrl: null,
    MainText: null,
    DetailText: null,
  };

  constructor(
    public utilitiesSrv: UtilitiesService,
    public spinner: NgxSpinnerService,
    public globalSrv: GlobalService
  ) {}

  ngOnInit(): void {}

  //get file from storage
  getFiles = (e: any) => {
    this.file = e.target.files[0];
    console.log(this.file);
    if(this.file?.size > 1048578) { //1048576 1mb
      Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: `Please select image size is less than 1MB`,
        // confirmButtonText: 'Yes',
        // cancelButtonText: 'No, Thanks',
      })
      return
    }
    Swal.fire({
      icon: 'warning',
      html: `Are you sure do you want to upload image <b>${this.file.name}</b>`,
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#28a745',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No, Thanks',
    }).then((result) => {
      if (result.isConfirmed) {
        this.upload();
      }
    });
  };

  //upload image
  upload = () => {
    this.spinner.show();
    this.utilitiesSrv.uploadFile(this.file).subscribe({
      next: (result) => {
        this.spinner.hide();
        console.log('imgUploadRes', result);
        this.model.ImageUrl = `${this.globalSrv.domain}/${result}`;
      },
      error: (err) => {
        this.spinner.hide();
        console.log('imgUploadErr', err);
      },
    });
  };

  typeOptionChange = (e: any) => {};

  onDataSubmit = () => {
    const { isValid } = ValidationEngine.validateGroup('validationGrp');
    if (isValid) {
      console.log(this.model);
      this.postNewsEventSlider();
    }
  };

  postNewsEventSlider = () => {
    this.utilitiesSrv.postNewsEventSliderImg(this.model).subscribe({
      next: (result) => {
        this.spinner.hide();
        console.log('post news, event, slider res', result);

        if (result) {
          Swal.fire({
            icon: 'success',
            title: 'Data added successfully!',
            confirmButtonText: 'Ok',
          });
        }
      },
      error: (err) => {
        this.spinner.hide();
        console.log('post news, event, slider err', err);
      },
    });
  };

  clearField = () => {
    ValidationEngine.resetGroup('validationGrp');
  };
}
