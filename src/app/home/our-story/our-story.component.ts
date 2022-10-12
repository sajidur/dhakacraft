import { Component, OnInit } from '@angular/core';
import { MenuControllerService } from 'src/app/services/menu-controller/menu-controller.service';

@Component({
  selector: 'app-our-story',
  templateUrl: './our-story.component.html',
  styleUrls: ['./our-story.component.scss']
})
export class OurStoryComponent implements OnInit {

  constructor(public menuControllerSrv: MenuControllerService) { }

  ngOnInit(): void {
  }

}
