import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserModel } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';
import { RegistrationFormComponent } from '../registration-form/registration-form.component';
import { SurveyComponent } from '../survey/survey.component';

@Component({
  selector: 'landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(public _dialog: MatDialog, private _loginService: LoginService) { }

  currentUser?: UserModel = undefined;

  ngOnInit(): void {
    this.getCurrentUser();
  }

  openRegistration(){
    const loginRef = this._dialog.open(RegistrationFormComponent, {width:"40%", height:"50%"});
  }
  openSurvey(){
    const loginRef = this._dialog.open(SurveyComponent, {width:"40%", height:"30%"});
  }
  getCurrentUser():void{
    this._loginService.getCurrentUser().subscribe(
      (data: UserModel) => (this.currentUser = data),
      (err) => (this.currentUser = undefined)
    );

  }
}
