import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global/global.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-home-menu',
  templateUrl: './admin-home-menu.component.html',
  styleUrls: ['./admin-home-menu.component.scss']
})
export class AdminHomeMenuComponent implements OnInit {

  rowSize = 10
  pageContent: any[] = [];

  constructor(
    public utilitiesSrv: UtilitiesService,
    public spinner: NgxSpinnerService,
    public globalSrv: GlobalService,
    public router: Router
  ) {}

  ngOnInit(): void {
     this.getAllPageContent()
  }

 
  getAllPageContent = () => {
    this.spinner.show();
    this.utilitiesSrv.getAllPageContent().subscribe({
      next: (result) => {
        this.spinner.hide();
        console.log('pageListRes', result);
        if(result) {
          this.pageContent = result;
        }
      },
      error: (err) => {
        this.spinner.hide();
        console.log('pageListErr', err);
      },
    });
  }

  delete = (Id: any) => {
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
        this.deletePageContent(Id);
      }
    });
  }

  deletePageContent = (Id: any) => {
    this.utilitiesSrv.deletePageContentById(Id).subscribe({
      next: (result) => {
        this.spinner.hide();
        console.log('deleteRes', result);
        if(result) {
          this.getAllPageContent()
        }
      },
      error: (err) => {
        this.spinner.hide();
        console.log('deleteErr', err);
      },
    });
  }

  editHomeMenu = (Id: any, data: any) => {
    this.utilitiesSrv.editHomeMenu = data
    this.router.navigateByUrl(`/admin/add-home-menu?Id=${Id}`)
  }

}
