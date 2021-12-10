import { apiURL } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { LoginModel } from './../models/login.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  public loginUser(user: LoginModel): Observable<any> {
    return this.http.post<any>(`${apiURL}/Login`, user);
  }
  public getCurrentUser(): Observable<UserModel>{
    return this.http.get<UserModel>(`${apiURL}/Login`);
  }
}
