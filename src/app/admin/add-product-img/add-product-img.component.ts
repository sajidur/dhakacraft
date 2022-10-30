import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global/global.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import ValidationEngine from 'devextreme/ui/validation_engine';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product-img',
  templateUrl: './add-product-img.component.html',
  styleUrls: ['./add-product-img.component.scss'],
})
export class AddProductImgComponent implements OnInit {
  file: any;
  categoryList: any[] = [];

  model: any = {
    CategoryId: null,
    Name: null,
    TitleText: null,
    InStockText: null,
    ShortText: null,
    Price: 0,
    DetailText: null,
  };
  productId: any;

  imgModel: any = {
    IsDefault: false,
    ProductId: null,
    ImageUrl: null,
    ImageText: null,
  };
  isDefaultCheckBoxDisabled: boolean = false;

  constructor(
    public utilitiesSrv: UtilitiesService,
    public spinner: NgxSpinnerService,
    public globalSrv: GlobalService
  ) {}

  ngOnInit(): void {
    this.categoryList = this.utilitiesSrv.allCategory;
  }

  //add news, event, slider
  addProduct = async (body: any) => {
    try {
      return await this.utilitiesSrv.addProduct(body).toPromise();
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
      // let uploadRes = null
      // if(this.file) {
      //   uploadRes = await this.upload();
      // }
      // if(!!uploadRes) {
      //   this.model.ImageUrl = uploadRes
      // }
      const addProductRes = await this.addProduct(this.model);
      console.log(addProductRes);
      this.productId = addProductRes;
      this.isDefaultCheckBoxDisabled = false;
      if (!!addProductRes) {
        this.spinner.hide();
        //  this.resetImgModel()
        Swal.fire({
          icon: 'success',
          title: 'Product added successfully!',
          confirmButtonText: 'Ok',
        });
      }
    }
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
  //  upload img
  upload = async () => {
    try {
      return await this.utilitiesSrv.uploadFile(this.file).toPromise();
    } catch (error) {
      this.spinner.hide();
      console.log(error);
    }
  };

  saveImageProduct = async () => {
    this.spinner.show();
    let uploadRes = null;
    if (this.file) {
      uploadRes = await this.upload();
    }
    if (!!uploadRes) {
      this.imgModel.ImageUrl = uploadRes;

      if (this.imgModel.IsDefault) {
        this.isDefaultCheckBoxDisabled = true;
      }

      this.imgModel.ProductId = this.productId;
      console.log('imgModel', this.imgModel);
      const saveImgRes = await this.saveImgProduct(this.imgModel);
      if (!!saveImgRes) {
        this.spinner.hide();
        this.resetImgModel();
        Swal.fire({
          icon: 'success',
          title: 'Image added successfully!',
          confirmButtonText: 'Ok',
        });
      }
    }
  };

  saveImgProduct = async (body: any) => {
    try {
      return await this.utilitiesSrv.saveImgProduct(body).toPromise();
    } catch (error) {
      this.spinner.hide();
      console.log(error);
    }
  };
  resetImgModel = () => {
    this.imgModel.IsDefault = false;
    this.imgModel.ImageText = null;
    this.imgModel.ImageUrl = null;
  };
}
