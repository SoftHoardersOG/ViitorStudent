import { UniversityCardModel } from './../models/university-card.model';
import { apiURL } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UniversityExtendedModel } from '../models/university-extended.model';
import { ReviewModel } from '../models/review.model';

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
  public getExtendedUniversity(id:number):Observable<UniversityExtendedModel>{
    return this.http.get<UniversityExtendedModel>(`${apiURL}/UniversityCard/$${id}`);
  }
  public postReview(review :ReviewModel){
    return this.http.post<ReviewModel>(`${apiURL}/UniversityCard/review`,review);
  }
}
