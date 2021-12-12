import { UserModel } from '../../models/user.model';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public user: UserModel) {
    console.log(user);
   }

  ngOnInit(): void {
    
  }

}
 