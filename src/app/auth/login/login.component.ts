import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import Swal from 'sweetalert2';
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
    private router: Router,
    public spinner: NgxSpinnerService,
    public utilitiesSrv: UtilitiesService
    ) { 
      
    }

  ngOnInit(): void {
    this.formHandler()
  }

  formHandler = () => {
    this.loginForm = this.formBuilder.group({
      UserName: ['', Validators.required],
      Password: ['', Validators.required],
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
      this.spinner.show()
      this.utilitiesSrv.login(this.loginForm.value).subscribe({
        next: (result) => {
          this.spinner.hide()
          console.log('loginRes', result);
          if (!result) {
            Swal.fire({
              icon:'error',
              title: 'Error',
              text: 'Invalid user name or password'
            })
            return
          }

            this.router.navigateByUrl('admin')
          
        },
        error: (err) => {
          this.spinner.hide()
          console.log('loginErr', err);
        },
      });



   
  }

}
