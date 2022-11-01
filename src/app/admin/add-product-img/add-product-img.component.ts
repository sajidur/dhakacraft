import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global/global.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import ValidationEngine from 'devextreme/ui/validation_engine';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

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
  // "CategoryId": 0,
  // "Name": "string",
  // "TitleText": "string",
  // "InStockText": "string",
  // "ShortText": "string",
  // "Price": 0,
  // "DetailText": "string",
  // "Id": 0,
  productId: any;

  imgModel: any = {
    IsDefault: false,
    ProductId: null,
    ImageUrl: null,
    ImageText: null,
  };
  isDefaultCheckBoxDisabled: boolean = false;
  productDetail: any;
  editMode: boolean = false;

  constructor(
    public utilitiesSrv: UtilitiesService,
    public spinner: NgxSpinnerService,
    public globalSrv: GlobalService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.categoryList = this.utilitiesSrv.allCategory;
    this.getAllCategory()
    this.getQueryParams()
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

  getQueryParams = () => {
    this.route.queryParams.subscribe((params) => {
      if (params['productId']) {
        this.productId = Number(params['productId']);
        this.getProductByProductId(this.productId);
      }
    });
  }

  getProductByProductId = (Id: any) => {
    this.spinner.show();
    // this.productList = [];
    this.utilitiesSrv.getProductByProductId(Id).subscribe({
      next: (result) => {
        this.spinner.hide();
        console.log('In edit mode getProductById', result);
        this.productDetail = result 
        // this.productId = result?.Id
        const { CategoryId, Name, TitleText, InStockText, ShortText, Price, DetailText } = this.productDetail
        this.model = {
          CategoryId,
          Name,
          TitleText,
          InStockText,
          ShortText,
          Price,
          DetailText
        }
        this.editMode = true;
       
      },
      error: (err) => {
        this.spinner.hide();
        console.log('getProductByIdErr', err);
      },
    });
  }

  //add news, event, slider
  addProduct = async (body: any) => {
    try {
      return await this.utilitiesSrv.addProduct(body).toPromise();
    } catch (error) {
      this.spinner.hide();
      console.log(error);
    }
  }

  onDataSubmit = async () => {
    const { isValid } = ValidationEngine.validateGroup('validationGrp');
    if (isValid) {
      // console.log(this.model);
      this.spinner.show();
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
  }

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
  }
  //  upload img
  upload = async () => {
    try {
      return await this.utilitiesSrv.uploadFile(this.file).toPromise();
    } catch (error) {
      this.spinner.hide();
      console.log(error);
    }
  }

  saveImageProduct = async () => {
    this.spinner.show();
    let uploadRes = null;
    if(!this.file) {
      Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: 'Please select your image first!'
      })
      return
    }
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
        this.getProductByProductId(this.productId)
        this.resetImgModel();
        Swal.fire({
          icon: 'success',
          title: 'Image added successfully!',
          confirmButtonText: 'Ok',
        });
      }
    }
  }

  saveImgProduct = async (body: any) => {
    try {
      return await this.utilitiesSrv.saveImgProduct(body).toPromise();
    } catch (error) {
      this.spinner.hide();
      console.log(error);
    }
  }

  resetImgModel = () => {
    this.imgModel.IsDefault = false;
    this.imgModel.ImageText = null;
    this.imgModel.ImageUrl = null;
  }

  //delete confirmation dialog
  delete = (Id: any, index: any) => {
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
        this.deleteProductImg(Id, index);
      }
    });
  }
  // Delete product image 
  deleteProductImg = (Id: any, index: any) => {
    this.utilitiesSrv.deleteProductImg(Id).subscribe({
      next: (result) => {
        this.spinner.hide();
        console.log('deleteProductImgRes', result);
        if(result) {
          this.productDetail?.Images.splice(index, 1)
        }
      },
      error: (err) => {
        this.spinner.hide();
        console.log('deleteProductImgErr', err);
      },
    });
  }

  //Product edit
  editProduct = () => {
    this.spinner.show();
    console.log(this.model)
    this.utilitiesSrv.editProduct(this.model,this.productId).subscribe({
      next: (result) => {
        this.spinner.hide();
        console.log('productEditRes',result)
        this.isDefaultCheckBoxDisabled = false;
       if(result) {
  
        Swal.fire({
          icon: 'success',
          title: 'Product updated successfully!',
          confirmButtonText: 'Ok',
        });
       }
       
      },
      error: (err) => {
        this.spinner.hide();
        console.log('productEditErr', err);
      },
    });

  }

}
