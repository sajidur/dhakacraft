import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { MenuControllerService } from 'src/app/services/menu-controller/menu-controller.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    public menuControllerSrv: MenuControllerService
    ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
  });
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

      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
  }

  ourStoryItem = (menu: any) => {
    this.menuControllerSrv.ourStoryMenuItem = menu
    this.router.navigate(['our-story']);
  }

  downloadAnnualReportPdf(pdfUrl: string, pdfName: string) {
		// const pdfUrl = '../../../../assets/sample.pdf';
		// const pdfName = 'your_pdf_file';
		// FileSaver.saveAs(pdfUrl, pdfName);
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

  homeMenuItem = (homeMenu: any) => {
    this.menuControllerSrv.homeMenuItem = homeMenu
    this.router.navigate(['home']);
  }

  personalItem = (item: any) => {
    this.menuControllerSrv.personalMenuItem = item
    this.router.navigate(['personal-accessories']);
  }

}
