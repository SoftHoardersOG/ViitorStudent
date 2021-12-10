import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegistrationModel } from 'src/app/models/registration.model';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
})
export class RegistrationFormComponent implements OnInit {
  @ViewChild('registrationForm') registartionForm: any ;

  constructor(private registrationService: RegistrationService, private _matSnackBar : MatSnackBar) {}


  registrationModel: RegistrationModel = new RegistrationModel();
  hide: boolean = true;
  isValid: boolean = true;
  usernameMinLength: number = 4;
  ngOnInit(): void {}

  addUser(): void {
    this.registrationService
      .registerUser(this.registrationModel)
      .subscribe((data: RegistrationModel) => console.log(data), err => {this._matSnackBar.open(err.error,"",{duration:2000})});
     // this.registrationModel = new RegistrationModel();
     // this.registartionForm.form.markAsPristine();

  }

  verifyUsername(): void {
    this.registrationService
      .verifyUsername(this.registrationModel.username)
      .subscribe((data: boolean) => {
        console.log(data);
        console.log("In subscribe");
        
        this.isValid = data;
        if (!this.isValid)
          this.registartionForm.form.controls.username.setErrors({
            notUnique: true,
          });
      }, error => { console.log(error.error);
      });
  }

  emailValidate():void{
    if(!this.registrationModel.email.substring(1,this.registrationModel.email.length-1).includes("@"))
    this.registartionForm.form.controls.email.setErrors({
      notValid: true,
    });
  }
}
