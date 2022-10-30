import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global/global.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import ValidationEngine from 'devextreme/ui/validation_engine';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-news-event-slider-img',
  templateUrl: './add-news-event-slider-img.component.html',
  styleUrls: ['./add-news-event-slider-img.component.scss']
})
export class AddNewsEventSliderImgComponent implements OnInit {
  
  file: any;
  typeList = [
    { id: 1, name: 'Topbar' },
    { id: 2, name: 'News and Event' },
    { id: 3, name: 'Main Slider' },
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
  ) { }

  ngOnInit(): void {
  }

   //get file from storage
   getFiles = async(e: any) => {
    this.file = e.target.files[0];
    console.log(this.file);
    if(this.file?.size > 1048578) { //1048576 1mb
      Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: `Please select image size is less than 1MB`,
      })
      return
    }
  };

 //upload img
  upload = async () => {
    try {
      return await this.utilitiesSrv.uploadFile(this.file).toPromise()
    }
    catch (error) {
      this.spinner.hide()
       console.log(error)
    }
  }

  onDataSubmit = async () => {
    const { isValid } = ValidationEngine.validateGroup('validationGrp');
    if (isValid) {
      // console.log(this.model);
      this.spinner.show()
      let uploadRes = null
      if(this.file) {
        uploadRes = await this.upload();
      }
      if(!!uploadRes) {
        this.model.ImageUrl = uploadRes
      }
      const newsEventSliderRes = await this.postNewsEventSlider(this.model);
      if(!!newsEventSliderRes) {
        this.spinner.hide()
        this.model = {}
        Swal.fire({
            icon: 'success',
            title: 'Data added successfully!',
            confirmButtonText: 'Ok',
           });
      }
    }
  };

  //add news, event, slider
  postNewsEventSlider = async (body: any) => {
    try {
      return await this.utilitiesSrv.postNewsEventSliderImg(body).toPromise()
    }
    catch(error) {
       this.spinner.hide()
       console.log(error)
    }
  };


}