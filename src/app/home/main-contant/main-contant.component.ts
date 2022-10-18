import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-contant',
  templateUrl: './main-contant.component.html',
  styleUrls: ['./main-contant.component.scss']
})
export class MainContantComponent implements OnInit {

  constructor(
    public router: Router
  ) { 

  }

  ngOnInit(): void {
  }

  goToNewsAndEventDetails = () => {
    this.router.navigateByUrl('news-event')
  }

}
