import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiURL } from 'src/environments/environment';
import { RegistrationModel } from '../models/registration.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  constructor(private http : HttpClient) {
  }

  public registerUser(user : RegistrationModel) : Observable<RegistrationModel>{
    return this.http.post<RegistrationModel>(`${apiURL}/Register`,user);
  }
}
