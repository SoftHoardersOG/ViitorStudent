import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegistrationModel } from 'src/app/models/registration.model';
import { RegistrationService } from 'src/app/services/registration.service';
import { LoginFormComponent } from '../login-form/login-form.component';

@Component({
  selector: 'registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
})
export class RegistrationFormComponent implements OnInit {
  @ViewChild('registrationForm') registartionForm: any ;

  constructor(private registrationService: RegistrationService, private _matSnackBar : MatSnackBar, public _dialog: MatDialog,) {}


  registrationModel: RegistrationModel = new RegistrationModel();
  hide: boolean = true;
  isValid: boolean = true;
  usernameMinLength: number = 4;
  ngOnInit(): void {}

  addUser(): void {
    this.registrationService
      .registerUser(this.registrationModel)
      .subscribe((data: RegistrationModel) => this._dialog.open(LoginFormComponent), err => {this._matSnackBar.open(err.error,"",{duration:2000,panelClass:['mat-toolbar','mat-warn']})});
     // this.registrationModel = new RegistrationModel();
     // this.registartionForm.form.markAsPristine();

  }

  verifyUsername(): void {
    this.registrationService
      .verifyUsername(this.registrationModel.username)
      .subscribe((data: boolean) => {
        this.isValid = data;
        if (!this.isValid)
          this.registartionForm.form.controls.username.setErrors({
            notUnique: true,
          });
      }, error => { console.log(error.error);
      });
  }

  emailValidate():void{
    if(!this.isValidEmail(this.registrationModel.email))
    this.registartionForm.form.controls.email.setErrors({
      notValid: true,
    });
  }
  private isValidEmail (email:string):boolean{
    if (email.includes(' ')){
      return false;
    }
    let words=email.split("@");
    if (words.length!=2){
      return false;
    }
    if(words[0].length==0||words[1].length==0){
      return false;
    }
    let afterAt = words[1].split(".");
    if (afterAt.length!=2){
      return false;
    }
    if(afterAt[0].length==0||afterAt[1].length<=1){
      return false;
    }
    return true;
  }
}
