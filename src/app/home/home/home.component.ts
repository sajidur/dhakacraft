import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { ContactFromComponent } from 'src/app/contact-from/contact-from.component';
import { MenuControllerService } from 'src/app/services/menu-controller/menu-controller.service';
const FileSaver = require('file-saver');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  currentYear: number;

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    public menuControllerSrv: MenuControllerService,
    public dialog: MatDialog,
    private viewportScroller: ViewportScroller
    ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
  });
  this.stickyChatButton()
  this.currentYear = new Date().getFullYear();
  }

  closeLeaveMessage() {
    $("#leave-message").css("display", "none");
    $("#float-message-btn").css("display", "block");
  }

  openLeaveMessagePopup() {
    $("#float-message-btn").css("display", "none");
    $("#leave-message").css("display", "block");
  }

  // convenience getter for easy access to form fields
  get f() { 
    return this.registerForm.controls; 
  }

  onSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }
      // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
  }

  mouseOver = (dropdownContent: any) => {
    console.log('over')
    $("."+dropdownContent).css("display", "block");
  }
  mouseOut = (dropdownContent: any) => {
    console.log('out')
    $("."+dropdownContent).css("display", "none");
  }

  ourStoryItem = (item: any, scrollToRequiredId: any) => {
     $(".dropdown-content1").css("display", "none");
     this.menuControllerSrv.ourStoryMenuItem = item
    //  this.router.navigate(['our-story']);
    this.router.navigate(['our-story']).then(()=>{
     if(scrollToRequiredId){
      setTimeout(() => {
        this.viewportScroller.scrollToAnchor('our-story');
      }, 1000);
     }
    });''
 
  }

  homeMenuItem = (item: any) => {
    $(".dropdown-content2").css("display", "none");
    this.menuControllerSrv.homeMenuItem = item
    this.router.navigate(['home']);
  }

  gardenMenu = (item: any) => {
    $(".dropdown-content3").css("display", "none");
    this.menuControllerSrv.gardenMenuItem = item
    this.router.navigate(['garden']);
  }

  personalItem = (item: any) => {
    $(".dropdown-content4").css("display", "none");
    this.menuControllerSrv.personalMenuItem = item
    this.router.navigate(['personal-accessories']);
  }

  christmasItem = (item: any) => {
    $(".dropdown-content5").css("display", "none");
    this.menuControllerSrv.christmasMenuItem = item
    this.router.navigate(['christmas']);
  }

  downloadAnnualReportPdf = () => {
		const pdfUrl = "../../../assets/pdf/AnnualReport.pdf";
		const pdfName = 'DhakaHandiCraftAnnualReport';
		FileSaver.saveAs(pdfUrl, pdfName);
	}

  goToContactUs = (id:any) => {
    let scrollHere: any;
		scrollHere = document.getElementById(id);
		let rect = scrollHere.getBoundingClientRect().top;
		window.scrollTo({
      top:rect,
      behavior:'smooth'
    })
  }

  stickyChatButton = () => {
		$(window).on('scroll', function () {
			const scroll: any = $(window).scrollTop();
			if (scroll < 150) {
        $("#float-message-btn").css("display", "none")
				// $('#sticky-header').removeClass('sticky');
				// $('#back-top').fadeIn(500);
			} else {
        $("#float-message-btn").css("display", "block")
				// $('#sticky-header').addClass('sticky');
				// $('#back-top').fadeIn(500);
			}
		});
	}

  handleContactForm = (data: any) => {
    const dialogRef = this.dialog.open(ContactFromComponent, {
      disableClose: true,
      width: '50%',
      height: '85%',
      maxWidth: '90vw',
      data: data,
    });

    // After closed is fired when dialog component send data 
    dialogRef.afterClosed().subscribe((result) => {
      if (result.data == 'view-catalog') {
      } 
    });
  }

}
