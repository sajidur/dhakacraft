import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';

@Component({
  selector: 'app-menu-img',
  templateUrl: './menu-img.component.html',
  styleUrls: ['./menu-img.component.scss']
})
export class MenuImgComponent implements OnInit {
  imgUrl: any;
  file:any
  @Output() onChange: EventEmitter<File> = new EventEmitter<File>();

  constructor(
    public utilitiesSrv: UtilitiesService
  ) { }

  ngOnInit(): void {
  }

  onSelectFiles = (e: any) => {
    this.file = e.target.files[0];

    // const filesArray = e.target.files;
    // if (filesArray.length > 0) {
    //   for (let i = 0; i < filesArray.length; i++) {
    //     let fileType = filesArray[i].type.substring(
    //       0,
    //       filesArray[i].type.indexOf('/')
    //     );
    //     if (fileType == 'application') {
    //       fileType = 'file';
    //     }

    //     if (fileType) {
    //       this.utilitiesSrv.audioVideoUpload(filesArray[i]).subscribe(
    //         (result) => {
    //           if (result.status == 'ok') {
    //             // this.uploadImgUrl = result?.result?.url;
    //             console.log('Help result', result);
    //           }
    //         },
    //         (err) => {
    //           console.log('file upload err', err);
    //         }
    //       );
    //     }
    //   }
    // }
  }

  upload = () => {
    this.utilitiesSrv.uploadFile(this.file).subscribe({
      next: (result) => {
        // this.spinner.hide()
        console.log('home', result);
  
      },
      error: (err) => {
        // this.spinner.hide()
        console.log('homeerr', err);
      },
    });
  }

}
