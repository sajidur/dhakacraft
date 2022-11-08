import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import ValidationEngine from 'devextreme/ui/validation_engine';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-img-config',
  templateUrl: './add-img-config.component.html',
  styleUrls: ['./add-img-config.component.scss'],
})
export class AddImgConfigComponent implements OnInit {
  file: any;
  typeList = [
    { id: 1, name: 'Social Impact' },
    { id: 2, name: 'Membership' },
    { id: 3, name: 'Request Catalog' },
  ];
  model: any = {
    Name: null,
    ImagePosition: null,
    ImageUrl: null,
    DetailsText: null,
  };

  constructor(
    public utilitiesSrv: UtilitiesService,
    public spinner: NgxSpinnerService,
    public globalSrv: GlobalService
  ) {}

  ngOnInit(): void {}

  //get file from storage
  getFiles = async (e: any) => {
    this.file = e.target.files[0];
    console.log(this.file);
    if (this.file?.size > 1048578) {
      //1048576 = == 1mb
      Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: `Please select image size is less than 1MB`,
      });
      return;
    }
  };

  //upload img
  upload = async () => {
    try {
      const res = this.utilitiesSrv.uploadFile(this.file);
      return await lastValueFrom(res);
      // return await this.utilitiesSrv.uploadFile(this.file).toPromise()
    } catch (error) {
      this.spinner.hide();
      console.log(error);
    }
  };

  onDataSubmit = async () => {
    const { isValid } = ValidationEngine.validateGroup('validationGrp');
    if (isValid) {
      console.log(this.model);

      try {
    
        if (!this.file) {
          Swal.fire({
            icon: 'warning',
            title: 'Please select image first!',
            confirmButtonText: 'Ok',
          });
          return;
        }
        this.spinner.show();
        const uploadRes = await this.upload();
        if (!!uploadRes) {
          this.model.ImageUrl = uploadRes;
        }
        const imgConfigRes = await this.postImgConfig(this.model);
        this.model = {};
        this.spinner.hide()
        Swal.fire({
          icon: 'success',
          title: 'Data added successfully!',
          confirmButtonText: 'Ok',
        });
      } catch (error) {
        this.spinner.hide();
        Swal.fire({
          icon: 'error',
          title: 'Some went wrong, Please try again later',
          confirmButtonText: 'Ok',
        });
      }
    }
  };

  //add news, event, slider
  postImgConfig = async (body: any) => {
    try {
      const res = this.utilitiesSrv.postImgConfig(body);
      return await lastValueFrom(res);
      // return await this.utilitiesSrv.postNewsEventSliderImg(body).toPromise()
    } catch (error) {
      this.spinner.hide();
      console.log(error);
    }
  };
}
