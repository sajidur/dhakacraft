import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dhakahandicraft';
  constructor
  (public router: Router) 
  {
     	// Page loading animation
       $(window).on('load', function() {
        setTimeout(() => {
          $('#js-preloader').addClass('loaded');
        }, 2000);
  
    });
    
   this.router.navigate([''])
  }

}
