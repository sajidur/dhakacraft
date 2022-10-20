import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactFromComponent } from 'src/app/contact-from/contact-from.component';

@Component({
  selector: 'app-images-details',
  templateUrl: './images-details.component.html',
  styleUrls: ['./images-details.component.scss']
})
export class ImagesDetailsComponent implements OnInit {

  constructor(
    public dialog: MatDialog
    ) 
    { 

    }

  ngOnInit(): void {
  }

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
      data: '',
    });

    // After closed is fired when dialog component send data 
    dialogRef.afterClosed().subscribe((result) => {
      if (result.data == 'send-message') {
      } 
    });
  }

}
