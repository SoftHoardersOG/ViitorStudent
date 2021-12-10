import { Component, OnInit } from '@angular/core';
import { RegistrationModel } from 'src/app/models/registration.model';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
})
export class RegistrationFormComponent implements OnInit {
  constructor(private registrationService: RegistrationService) {}

  registrationModel: RegistrationModel = new RegistrationModel();
  ngOnInit(): void {}

  addUser(): void {
    this.registrationService
      .registerUser(this.registrationModel)
      .subscribe((data: RegistrationModel) => console.log(data));
  }
}
