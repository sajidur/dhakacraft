import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-news-event-slider-img',
  templateUrl: './news-event-slider-img.component.html',
  styleUrls: ['./news-event-slider-img.component.scss']
})
export class NewsEventSliderImgComponent implements OnInit {
  file: any;

  constructor(
    public utilitiesSrv: UtilitiesService,
    public spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
  }

  //get file from storage
  getFiles = (e: any) => {
    this.file = e.target.files[0];
    console.log(this.file)
    Swal.fire({
      icon: 'warning',
      html: `Are you sure do you want to upload image <b>${this.file.name}</b>`,
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#28a745',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No, Thanks'
    }).then(result => {
      if(result.isConfirmed) {
        this.upload()
      }
    })
  }  

  //upload image
  upload = () => { 
    this.spinner.show()
    this.utilitiesSrv.uploadFile(this.file).subscribe({
      next: (result) => {
        this.spinner.hide()
        console.log('imgUploadRes', result);
      },
      error: (err) => {
        this.spinner.hide()
        console.log('imgUploadErr', err);
      },
    });
  }

}
