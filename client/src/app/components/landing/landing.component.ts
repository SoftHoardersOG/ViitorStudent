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
    this._loginService.loginEvent$.subscribe((data : UserModel)=>{
      this.currentUser = data;
    })
  }

  openRegistration(){
    const registartionRef = this._dialog.open(RegistrationFormComponent, {width:"40%" ,minWidth:"400px", height:"50%", minHeight:"600px"});
  }
  openSurvey(){
    const surveyRef = this._dialog.open(SurveyComponent, {width:"40%", height:"fit-content",});
  }

}
