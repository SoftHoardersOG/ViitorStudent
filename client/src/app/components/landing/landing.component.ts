import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ignoreElements } from 'rxjs';
import { SurveyModel } from 'src/app/models/survey.model';
import { UserModel } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';
import { SurveyService } from 'src/app/services/survey.service';
import { RegistrationFormComponent } from '../registration-form/registration-form.component';
import { SurveyComponent } from '../survey/survey.component';

@Component({
  selector: 'landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})

export class LandingComponent implements OnInit {
  constructor(
    public _dialog: MatDialog,
    private _loginService: LoginService,
    private _surveyService: SurveyService
  ) {}

  currentUser?: UserModel = undefined;
  survey?: SurveyModel = undefined;

  ngOnInit(): void {
   this._surveyService.$surveyChanged.subscribe(data=>this.survey=data)
   this._loginService.loginEvent$.subscribe(data=>this.currentUser=data)
  }

  openRegistration(): MatDialogRef<RegistrationFormComponent> {
    return this._dialog.open(RegistrationFormComponent, {
      width: '40%',
      minWidth: '400px',
      height: '50%',
      minHeight: '600px',
    });
  }

  retakeSurvey() {
    let lastSurvey = this.survey;
    this._surveyService.$surveyChanged.emit();
    this._surveyService.deleteSurvey().subscribe((data) => {
      const ref = this.openSurvey(lastSurvey);
      ref.afterClosed().subscribe((d) => {
        console.log('CLOSED');
      });
    });
  }

  makeSurvey() {
    const ref = this.openSurvey();
    ref.afterClosed().subscribe((d) => {
      console.log('CLOSED');
    });

  }

  openSurvey(survey?: SurveyModel): MatDialogRef<SurveyComponent> {
    const ref = this._dialog.open(SurveyComponent, {
      width: '40%',
      height: 'fit-content',
      data: survey,
    });
    return ref;
  }
}
