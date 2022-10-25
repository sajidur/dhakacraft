import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { NgxSpinner } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router
    ) { 
      
    }

  ngOnInit(): void {
    this.formHandler()
  }

  formHandler = () => {
    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      // email: [
      //   '',
      //   [
      //     Validators.required,
      //     Validators.email,
      //     Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      //   ],
      // ],
    });
  };

  get f() {
    return this.loginForm.controls;
  }

  onSubmit = () => {
    console.log(this.loginForm.value);
    // console.log(this.loginForm.value);
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.router.navigateByUrl('admin')
    // this.spinner.show()
    // this.utilitiesSrv.postContactUs(this.loginForm.value).subscribe({
    //   next: (result) => {
    //     this.spinner.hide()
    //     console.log('contactUsFormRes', result);
  
    //     if (result) {
    //       this.dialogRef.close()
    //       Swal.fire({
    //         icon:'success',
    //         title:'Form submitted successfully!',
    //         confirmButtonText: 'Ok'
    //     })
    //     }
    //   },
    //   error: (err) => {
    //     this.spinner.hide()
    //     console.log('contactUsFormErr', err);
    //   },
    // });
  }

}
