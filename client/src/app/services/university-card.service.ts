import { UniversityCardModel } from './../models/university-card.model';
import { apiURL } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { LoginModel } from './../models/login.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UniversityCardService {
  constructor(private http: HttpClient) {}

  public getAllUniversities(): Observable<Array<UniversityCardModel>>{
    return this.http.get<Array<UniversityCardModel>>(`${apiURL}/UniversityCard`);
  }
  public lazyGetUniversities(loadFrom:number,universityAmount:number): Observable<Array<UniversityCardModel>>{
    return this.http.get<Array<UniversityCardModel>>(`${apiURL}/UniversityCard/lazy/?loadFrom=${loadFrom}&universityAmount=${universityAmount}`);
  }
  public getUniversityCount():Observable<number>{
    return this.http.get<number>(`${apiURL}/UniversityCard/count`);
  }
}
