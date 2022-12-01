import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import Swal from 'sweetalert2';
import * as $ from "jquery";
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  urlEndCheck: any;
  currentRoute: any;

  constructor(
    changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher,
    private router: Router,
    private location: Location
  ) { 
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);

    router.events.subscribe((routerEvent: any) => {
      this.currentRoute = routerEvent.urlAfterRedirects;
      // console.log('urlEnd',this.currentRoute)
    });
  }

  ngOnInit(): void {
    // console.log(this.location.path())
    // this.currentRoute = this.location.path()
    this.userLoginCheck()
  }

  userLoginCheck = () => {
    const isUserLoggedIn = localStorage.getItem('isLoggedIn');
    if(!isUserLoggedIn) {
       this.router.navigateByUrl('/login')
    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  logout = () => {
    Swal.fire({
      icon:'warning',
      text:'Do you want to logout ?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl('/');
        localStorage.clear();
      }
    })
  }



}
