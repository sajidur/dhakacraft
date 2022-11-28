import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import ValidationEngine from 'devextreme/ui/validation_engine';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global/global.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

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
    { id: 4, name: 'Activities' },
  ];
  model: any = {
    Name: null,
    ImagePosition: null,
    ImageUrl: null,
    DetailsText: null,
  };
  editMode: boolean = false;
  Id: number;
  imgConfigObj: any;

  constructor(
    public utilitiesSrv: UtilitiesService,
    public spinner: NgxSpinnerService,
    public globalSrv: GlobalService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getQueryParams()
  }
  getQueryParams = () => {
    this.route.queryParams.subscribe((params) => {
      if (params['Id']) {
        this.editMode = true;
        this.Id = Number(params['Id']);
        this.imgConfigObj = this.utilitiesSrv.editImgConfig;
        const { Name, ImagePosition, DetailsText, ImageUrl } =
        this.imgConfigObj;

        this.model = {
          Name,
          ImagePosition,
          DetailsText,
          ImageUrl,
        };
      }
    });
  };

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
        this.spinner.hide();
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

   //Home menu edit
   editPageContent = async () => {
    this.spinner.show()
    let uploadRes = null;
    if (this.file) {
      uploadRes = await this.upload();
    }
    if (!!uploadRes) {
      this.model.ImageUrl = uploadRes;
    }
    const editImgConfigRes = await this.editImgConfig(this.model);
    this.spinner.hide()
    if (editImgConfigRes) {
      Swal.fire({
        icon: 'success',
        title: 'Edited successfully!',
        confirmButtonText: 'Ok',
      });
      this.router.navigateByUrl('admin/img-config');
    }
  };

  editImgConfig = async (body: any) => {
    try {
      const res = this.utilitiesSrv.editImageConfig(this.model, this.Id);
      return await lastValueFrom(res);
    } catch (error) {
      this.spinner.hide();
      console.log(error);
    }
  };
}
