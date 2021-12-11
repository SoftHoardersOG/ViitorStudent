import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserModel } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';
import { LoginFormComponent } from '../login-form/login-form.component';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(public _dialog: MatDialog, private _loginService: LoginService) {}

  currentUser?: UserModel = undefined;

  ngOnInit(): void {
   this.getCurrentUser();
  }

  getCurrentUser():void{
    this._loginService.getCurrentUser().subscribe(
      (data: UserModel) => (this.currentUser = data),
      (err) => (this.currentUser = undefined)
    );

  }

  openLogin(): void {
    const loginRef = this._dialog.open(LoginFormComponent);
    loginRef.afterClosed().subscribe(res =>{
      this.getCurrentUser();
    })
  }

  logout():void{
    this._loginService.logout();
    this.getCurrentUser();
  }

}
