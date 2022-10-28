import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global/global.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import ValidationEngine from 'devextreme/ui/validation_engine';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-menu-img',
  templateUrl: './add-menu-img.component.html',
  styleUrls: ['./add-menu-img.component.scss'],
})
export class AddMenuImgComponent implements OnInit {
  file: any;
  menuList = [
    { id: 1, name: 'Home' },
    { id: 2, name: 'Garden' },
    { id: 3, name: 'Personal Accessories' },
    { id: 4, name: 'Christmas' },
  ];

  model: any = {
    MenuId: null,
    Name: null,
    TitleText: null,
    ImageUrl: null,
  };

  constructor(
    public utilitiesSrv: UtilitiesService,
    public spinner: NgxSpinnerService,
    public globalSrv: GlobalService
  ) {}

  ngOnInit(): void {}

  //get file from storage
  //  getFiles = async(e: any) => {
  //   this.file = e.target.files[0];
  //   console.log(this.file);
  //   if(this.file?.size > 1048578) { //1048576 1mb
  //     Swal.fire({
  //       icon: 'warning',
  //       title: 'Warning',
  //       text: `Please select image size is less than 1MB`,
  //     })
  //     return
  //   }
  // };

  //upload img
  // upload = async () => {
  //   try {
  //     return await this.utilitiesSrv.uploadFile(this.file).toPromise()
  //   }
  //   catch (error) {
  //      console.log(error)
  //   }
  // }

  // Submit button click handler
  onDataSubmit = async () => {
    const { isValid } = ValidationEngine.validateGroup('validationGrp');
    if (isValid) {
      console.log(this.model);
      this.spinner.show();
      // let uploadRes = null
      // if(this.file) {
      //   uploadRes = await this.upload();
      // }
      // if(!!uploadRes) {
      //   this.model.ImageUrl = uploadRes
      // }
      const newsEventSliderRes = await this.postCategory(this.model);
      if (!!newsEventSliderRes) {
        this.spinner.hide();

        //Clear input field
        Object.keys(this.model).forEach((key) => (this.model[key] = null));

        Swal.fire({
          icon: 'success',
          title: 'Data added successfully!',
          confirmButtonText: 'Ok',
        });
      }
    }
  };

  postCategory = async (body: any) => {
    try {
      return await this.utilitiesSrv.postCategory(body).toPromise();
    } catch (error) {
      this.spinner.hide()
      console.log(error);
    }
  };
}
