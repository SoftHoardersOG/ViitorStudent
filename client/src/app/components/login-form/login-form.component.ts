import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginModel } from './../../models/login.model';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  constructor(private loginService: LoginService, private _snackBar:MatSnackBar,public dialogRef: MatDialogRef<LoginFormComponent>) {}
  loginModel: LoginModel = new LoginModel();
  ngOnInit(): void {}
  hide:boolean=true;

  loginUser(): void {
    this.loginService.loginUser(this.loginModel).subscribe((data) => {
      localStorage.setItem('jwt', data.token);
      this.dialogRef.close();
    }, err => this._snackBar.open(err.error,"",{duration:2000,panelClass: ['mat-toolbar','mat-warn']}));
  }
}
