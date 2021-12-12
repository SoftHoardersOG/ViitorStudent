import { UserPageComponent } from '../user-page/user-page.component';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserModel } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';
import { AboutUsComponent } from '../about-us/about-us.component';
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
      (err) => (this.currentUser = undefined),
      ()=>{this._loginService.emit(this.currentUser)}
    );
  }

  openLogin(): void {
    const loginRef = this._dialog.open(LoginFormComponent);
    loginRef.afterClosed().subscribe(res =>{
      this.getCurrentUser();
    })
  }

  openAboutUs(){
    const loginRef = this._dialog.open(AboutUsComponent, {width:"90%", height:"90%"});
    loginRef.afterClosed().subscribe(res =>{
      console.log("About us closed!");

    })
  }

  logout():void{
    this._loginService.logout();
    this.getCurrentUser();
  }

  openProfile(){
    const profileRed = this._dialog.open(UserPageComponent, {width:"fitContent", height:"fitContent", data: this.currentUser})
  }

}
