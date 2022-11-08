import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global/global.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-img-config',
  templateUrl: './img-config.component.html',
  styleUrls: ['./img-config.component.scss']
})
export class ImgConfigComponent implements OnInit {

  imgConfigList: any[] = [];
  rowSize:any = 10;

  constructor(
    public utilitiesSrv: UtilitiesService,
    public spinner: NgxSpinnerService,
    public globalSrv: GlobalService
  ) { }

  ngOnInit(): void {
    this.getAllImageConfig()
  }

  getAllImageConfig = () => {
    this.spinner.show();
    this.utilitiesSrv.getAllImageConfig().subscribe({
      next: (result) => {
        this.spinner.hide();
        console.log('imgConfigListRes', result);
        if(result) {
          this.imgConfigList = result;
        }
      },
      error: (err) => {
        this.spinner.hide();
        console.log('imgConfigListErr', err);
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
        this.deleteImgConfigById(Id);
      }
    });
  }

  deleteImgConfigById = (Id: any) => {
    this.utilitiesSrv.deleteImgConfigById(Id).subscribe({
      next: (result) => {
        this.spinner.hide();
        console.log('deleteRes', result);
        if(result) {
          this.getAllImageConfig()
        }
      },
      error: (err) => {
        this.spinner.hide();
        console.log('deleteErr', err);
      },
    });
  }

}
