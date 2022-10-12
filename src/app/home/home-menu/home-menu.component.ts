import { Component, OnInit } from '@angular/core';
import { MenuControllerService } from 'src/app/services/menu-controller/menu-controller.service';

@Component({
  selector: 'app-home-menu',
  templateUrl: './home-menu.component.html',
  styleUrls: ['./home-menu.component.scss']
})
export class HomeMenuComponent implements OnInit {

  constructor(public menuControllerSrv: MenuControllerService) { }

  ngOnInit(): void {
  }

}
