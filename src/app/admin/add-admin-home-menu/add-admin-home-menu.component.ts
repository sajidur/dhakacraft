import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { GlobalService } from 'src/app/services/global/global.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import Swal from 'sweetalert2';
import ValidationEngine from 'devextreme/ui/validation_engine';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-admin-home-menu',
  templateUrl: './add-admin-home-menu.component.html',
  styleUrls: ['./add-admin-home-menu.component.scss'],
})
export class AddAdminHomeMenuComponent implements OnInit {
  file: any;
  typeList = [
    { id: 1, name: 'Who We Are' },
    { id: 2, name: 'About Us' },
    { id: 3, name: 'Fair Trade' },
  ];

  model: any = {
    PageName: null,
    Headline: null,
    ImageUrl: null,
    MainText: null,
    DetailText: null,
  };
  menuObj: any;
  Id: number;
  editMode: boolean = false;

  constructor(
    public utilitiesSrv: UtilitiesService,
    public spinner: NgxSpinnerService,
    public globalSrv: GlobalService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getQueryParams();
  }

  getQueryParams = () => {
    this.route.queryParams.subscribe((params) => {
      if (params['Id']) {
        this.editMode = true;
        this.Id = Number(params['Id']);
        this.menuObj = this.utilitiesSrv.editHomeMenu;
        const { PageName, Headline, MainText, DetailText, ImageUrl } =
          this.menuObj;

        this.model = {
          PageName,
          Headline,
          MainText,
          DetailText,
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
      //1048576 1mb
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
      // console.log(this.model);
      this.spinner.show();
      let uploadRes = null;
      if (this.file) {
        uploadRes = await this.upload();
      }
      if (!!uploadRes) {
        this.model.ImageUrl = uploadRes;
      }
      const pageRes = await this.postPageContent(this.model);
      if (!!pageRes) {
        this.spinner.hide();
        this.model = {};
        Swal.fire({
          icon: 'success',
          title: 'Data added successfully!',
          confirmButtonText: 'Ok',
        });
      }
    }
  };

  postPageContent = async (body: any) => {
    try {
      const res = this.utilitiesSrv.postPageContent(body);
      return await lastValueFrom(res);
    } catch (error) {
      this.spinner.hide();
      console.log(error);
    }
  };

  //Home menu edit
  editPageContent = async () => {
    let uploadRes = null;
    if (this.file) {
      uploadRes = await this.upload();
    }
    if (!!uploadRes) {
      this.model.ImageUrl = uploadRes;
    }
    const pageRes = await this.editPage(this.model);
    if (pageRes) {
      Swal.fire({
        icon: 'success',
        title: 'Edited successfully!',
        confirmButtonText: 'Ok',
      });
      this.router.navigateByUrl('admin/home-menu');
    }
  };

  editPage = async (body: any) => {
    try {
      const res = this.utilitiesSrv.editPageContent(this.model, this.Id);
      return await lastValueFrom(res);
    } catch (error) {
      this.spinner.hide();
      console.log(error);
    }
  };
}
