import { apiURL } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { LoginModel } from './../models/login.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  public loginUser(user: LoginModel): Observable<any> {
    return this.http.post<any>(`${apiURL}/Login`, user);
  }
}
