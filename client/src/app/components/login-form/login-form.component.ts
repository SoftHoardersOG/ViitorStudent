import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginModel } from './../../models/login.model';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  constructor(private loginService: LoginService, private _snackBar:MatSnackBar) {}
  loginModel: LoginModel = new LoginModel();
  ngOnInit(): void {}
  hide:boolean=true;

  loginUser(): void {
    this.loginService.loginUser(this.loginModel).subscribe((data) => {
      localStorage.setItem('jwt', data.token);
    }, err => this._snackBar.open(err.error,"",{duration:2000,panelClass: ['mat-toolbar','mat-warn']}));
  }
}
