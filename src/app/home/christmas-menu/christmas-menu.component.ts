import { Component, OnInit } from '@angular/core';
import { MenuControllerService } from 'src/app/services/menu-controller/menu-controller.service';

@Component({
  selector: 'app-christmas-menu',
  templateUrl: './christmas-menu.component.html',
  styleUrls: ['./christmas-menu.component.scss']
})
export class ChristmasMenuComponent implements OnInit {

  constructor(
  public menuControllerSrv: MenuControllerService
  ) { 

  }

  ngOnInit(): void {
  }

}
