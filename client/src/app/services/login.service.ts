import { apiURL } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { LoginModel } from './../models/login.model';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  constructor(private http: HttpClient) {}
  public loginEvent$ : EventEmitter<UserModel> = new EventEmitter();

  public emit(user? : UserModel) : void{
    this.loginEvent$.emit(user);
  }

  public loginUser(user: LoginModel): Observable<any> {
    return this.http.post<any>(`${apiURL}/Login`, user);
  }

  public getCurrentUser(): Observable<UserModel>{
    return this.http.get<UserModel>(`${apiURL}/Login`);
  }

  public logout():void{
    localStorage.clear();
    this.loginEvent$.emit(undefined);
  }
}
