import { Component, OnInit } from '@angular/core';
import { MenuControllerService } from 'src/app/services/menu-controller/menu-controller.service';

@Component({
  selector: 'app-personal-accessories',
  templateUrl: './personal-accessories.component.html',
  styleUrls: ['./personal-accessories.component.scss']
})
export class PersonalAccessoriesComponent implements OnInit {

  constructor(public menuControllerSrv: MenuControllerService) { }

  ngOnInit(): void {
  }

}
