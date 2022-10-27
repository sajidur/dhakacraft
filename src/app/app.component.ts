import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UtilitiesService } from './services/utilities/utilities.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Dhaka Handicrafts Limited';

  constructor(
    public router: Router,
    public utilitiesSrv: UtilitiesService,
    public spinner: NgxSpinnerService
    ) 
  {
    // this.getAllNewsEventSlider()
  }

     // this.router.navigate([''])
     	// Page loading animation
    //    $(window).on('load', function() {
    //     setTimeout(() => {
    //       $('#js-preloader').addClass('loaded');
    //     }, 2000);
  
    // });
    
    // getAllNewsEventSlider = () => {
    //   this.spinner.show();
    //   this.utilitiesSrv.getAllNewsEventSliderImg().subscribe({
    //     next: (result) => {
    //       this.spinner.hide();
    //       console.log('newsListRes', result);
    //       // this.utilitiesSrv.allNewsEventSliderList = result;
    //     },
    //     error: (err) => {
    //       this.spinner.hide();
    //       console.log('newsListErr', err);
    //     },
    //   });
    // }

}
