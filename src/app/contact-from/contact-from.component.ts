import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { UtilitiesService } from '../services/utilities/utilities.service';

@Component({
  selector: 'app-contact-from',
  templateUrl: './contact-from.component.html',
  styleUrls: ['./contact-from.component.scss'],
})
export class ContactFromComponent implements OnInit {
  registerForm: FormGroup;
  submitted: boolean;
  isValidEmail: boolean;

  constructor(
    public dialogRef: MatDialogRef<ContactFromComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    public utilitiesSrv: UtilitiesService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    // console.log(this.data)
    this.formHandler();
    this.formValueSet();
  }

  formHandler = () => {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  };

  formValueSet = () => {
    this.registerForm.patchValue({ subject: this.data });
  };

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    console.log(this.registerForm.value);
    console.log(this.registerForm.value);
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.spinner.show()
    this.utilitiesSrv.postContactUs(this.registerForm.value).subscribe({
      next: (result) => {
        this.spinner.hide()
        console.log('contactUsFormRes', result);
  
        if (result) {
          this.dialogRef.close()
          Swal.fire({
            icon:'success',
            title:'Form submitted successfully!',
            confirmButtonText: 'Ok'
        })
        }
      },
      error: (err) => {
        this.spinner.hide()
        console.log('contactUsFormErr', err);
      },
    });
  }

  emailValidation(e: any) {
    if (e?.target?.value?.length >= 2) {
      if (
        new RegExp(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ).test(e.target.value)
      ) {
        this.isValidEmail = true;
      } else {
        this.isValidEmail = false;
      }
    }
  }

  closeDialogModal = () => {
    this.dialogRef.close({ data: 'close' });
  };
}
