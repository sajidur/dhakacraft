import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global/global.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-img',
  templateUrl: './product-img.component.html',
  styleUrls: ['./product-img.component.scss']
})
export class ProductImgComponent implements OnInit {

  categoryId: any;
  rowSize =10
  productList: any[] = [];
  categoryList: any;

  constructor(
    public utilitiesSrv: UtilitiesService,
    public spinner: NgxSpinnerService,
    public globalSrv: GlobalService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getAllCategory()
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

   categoryOptionChange = (e: any) => {
    console.log(e)
    this.categoryId = e.selectedItem.Id
    console.log(this.categoryId)
    this.getProductByCategoryId(this.categoryId)
   };

 
  getProductByCategoryId = (Id: any) => {
    this.spinner.show();
    this.utilitiesSrv.getProductByCategoryId(Id).subscribe({
      next: (result) => {
        this.spinner.hide();
        console.log('ProductListRes', result);
        if(result) {
          this.productList = result;
        }
      },
      error: (err) => {
        this.spinner.hide();
        console.log('ProductListErr', err);
      },
    });
  }

  delete = (Id: any, index:any) => {
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
        this.deleteProduct(Id, index);
      }
    });
  }

  deleteProduct = (Id: any, index: any) => {
    this.utilitiesSrv.deleteProductByProductId(Id).subscribe({
      next: (result) => {
        this.spinner.hide();
        console.log('deleteProductRes', result);
        if(result) {
          // this.getProductByCategoryId(this.categoryId)
          this.productList.splice(index, 1)
        }
      },
      error: (err) => {
        this.spinner.hide();
        console.log('deleteProductErr', err);
      },
    });
  }

  editProduct = (Id: any) => {
    this.router.navigateByUrl(`/admin/add-product?Id=${Id}`)
  }


}
