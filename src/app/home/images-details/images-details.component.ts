import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-images-details',
  templateUrl: './images-details.component.html',
  styleUrls: ['./images-details.component.scss']
})
export class ImagesDetailsComponent implements OnInit {

  constructor(private el: ElementRef) { }

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

}
