import { UserModel } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  user1= new UserModel();
  constructor() { 
    this.user1={ 
      userId: 1,
      username: "cacat",
      email: "pisat@gmail.com",
      lastName: "Popescu",
      firstName: "Ion",
      age: 2,
      joinDate: new Date("2019-01-16")
    }
  }

  ngOnInit(): void {
  }

}
