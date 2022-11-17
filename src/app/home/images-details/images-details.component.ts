import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContactFromComponent } from 'src/app/contact-from/contact-from.component';
import { GlobalService } from 'src/app/services/global/global.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';

@Component({
  selector: 'app-images-details',
  templateUrl: './images-details.component.html',
  styleUrls: ['./images-details.component.scss']
})
export class ImagesDetailsComponent implements OnInit {
  productDetail: any = {
      // "Id": 11,
      // "CategoryId": 1,
      // "Name": "Basket name goes here",
      // "TitleText": "Basket title goes here",
      // "InStockText": "In Stock",
      // "ShortText": "Basket short text goes here",
      // "Price": 300,
      // "DetailText": "This is a details text for basket",
      // "Images": [
      //     {
      //         "IsDefault": false,
      //         "ProductId": 11,
      //         "ImageUrl": "e6c449b9-1dff-411a-a74e-6d7946b6bedb4.jpg",
      //         "ImageText": "Image text for basket product",
      //         "Id": 12,
      //         "IsActive": true,
      //         "CreateDate": "2022-10-30T08:12:32.523",
      //         "UpdatedDate": "2022-10-30T08:12:32.523",
      //         "CreatedBy": 0,
      //         "UpdatedBy": 0
      //     },
      //     {
      //         "IsDefault": false,
      //         "ProductId": 11,
      //         "ImageUrl": "1efd28b9-12cd-404f-b1cc-c62072d9ce9e11.jpg",
      //         "ImageText": "Image 2 text for basket product",
      //         "Id": 13,
      //         "IsActive": true,
      //         "CreateDate": "2022-10-30T08:13:19.04",
      //         "UpdatedDate": "2022-10-30T08:13:19.04",
      //         "CreatedBy": 0,
      //         "UpdatedBy": 0
      //     },
      //     {
      //         "IsDefault": true,
      //         "ProductId": 11,
      //         "ImageUrl": "903fe478-5260-4cee-b08a-2ebd244dcccf_U6A8794.jpg",
      //         "ImageText": "Image 3 for basket",
      //         "Id": 14,
      //         "IsActive": true,
      //         "CreateDate": "2022-10-30T08:24:26.353",
      //         "UpdatedDate": "2022-10-30T08:24:26.353",
      //         "CreatedBy": 0,
      //         "UpdatedBy": 0
      //     }
      // ]
  }


  constructor(
    public dialog: MatDialog,
    public route: ActivatedRoute,
    public utilitiesSrv: UtilitiesService,
    public globalSrv: GlobalService,
    public spinner: NgxSpinnerService
    ) 
    { 

    }

    ngOnInit(): void {
      this.getQueryParams();
    }
  
    getQueryParams = () => {
      this.route.queryParams.subscribe((params) => {
        if (params['productId']) {
          let Id = Number(params['productId']);
          this.getProductByProductId(Id);
        }
      });
    };
  
    getProductByProductId = (Id: any) => {
      this.spinner.show();
      // this.productList = [];
      this.utilitiesSrv.getProductByProductId(Id).subscribe({
        next: (result) => {
          this.spinner.hide();
          console.log('getProductById', result);
          this.productDetail = result
         
        },
        error: (err) => {
          this.spinner.hide();
          console.log('getProductByIdErr', err);
        },
      });
    };


  imageChange = (e: any) => {

    const src: any = e.target.src
    const preview: any = document.getElementById('preview')
    preview.src = src
    
    const imageSlides: any = document.querySelectorAll('.img-slide')
    for (const item of imageSlides) {
      item.classList.remove('active')
    }

     e.target.parentElement.classList.add('active')
  }

  handleContactForm = () => {
    const dialogRef = this.dialog.open(ContactFromComponent, {
      disableClose: true,
      width: '50%',
      height: '85%',
      maxWidth: '90vw',
      data: `Request details for ${this.productDetail?.Name}`,
    });
  }

}
