import { Component, OnInit } from '@angular/core';
import { MenuControllerService } from 'src/app/services/menu-controller/menu-controller.service';

@Component({
  selector: 'app-garden-menu',
  templateUrl: './garden-menu.component.html',
  styleUrls: ['./garden-menu.component.scss']
})
export class GardenMenuComponent implements OnInit {

  constructor(
    public menuControllerSrv: MenuControllerService
  ) 
  { }

  ngOnInit(): void {
  }

}
