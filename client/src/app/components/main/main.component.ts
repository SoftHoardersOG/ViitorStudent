import { UserModel } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  constructor(private _loginEvent : LoginService) {

  }

  ngOnInit(): void {
    this._loginEvent.getCurrentUser().subscribe(
      user => {
        this._loginEvent.emit(user);
      }
    )
  }

}
