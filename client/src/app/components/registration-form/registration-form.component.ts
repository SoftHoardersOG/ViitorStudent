import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { RegistrationModel } from 'src/app/models/registration.model';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
})
export class RegistrationFormComponent implements OnInit {
  @ViewChild('registrationForm') registartionForm: any ;

  constructor(private registrationService: RegistrationService) {}


  registrationModel: RegistrationModel = new RegistrationModel();
  hide: boolean = true;
  isValid: boolean = true;
  usernameMinLength: number = 4;
  ngOnInit(): void {}

  addUser(): void {
    this.registrationService
      .registerUser(this.registrationModel)
      .subscribe((data: RegistrationModel) => console.log(data));
      this.registrationModel = new RegistrationModel();
      this.registartionForm.form.markAsPristine();

  }

  verifyUsername(): void {
    console.log(this.registartionForm);

    this.registrationService
      .verifyUsername(this.registrationModel.username)
      .subscribe((data: boolean) => {
        this.isValid = data;
        if (!this.isValid)
          this.registartionForm.form.controls.username.setErrors({
            notUnique: true,
          });
      });
  }

  emailValidate():void{
    if(!this.registrationModel.email.substring(1,this.registrationModel.email.length-1).includes("@"))
    this.registartionForm.form.controls.email.setErrors({
      notValid: true,
    });
  }
}
