import { UserModel } from './../models/user.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  @Input('user') user=new UserModel();

  constructor() { }

  ngOnInit(): void {
  }

}
 