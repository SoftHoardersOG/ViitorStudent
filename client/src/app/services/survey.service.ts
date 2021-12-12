import { UniversityCardModel } from './../models/university-card.model';
import { SortingSurveyModel } from './../models/sorting-survey.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiURL } from 'src/environments/environment';
import { CityModel } from '../models/city.model';
import { ClubModel } from '../models/club.model';
import { InterestModel } from '../models/interest.model';
import { JobModel } from '../models/job.model';
import { SubjectModel } from '../models/subject.model';
import { SurveyModel } from '../models/survey.model';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private http : HttpClient) { }

  getAllCities() : Observable<Array<CityModel>>{
    return this.http.get<Array<CityModel>>(`${apiURL}/cities`);
  }

  getAllClubs() : Observable<Array<ClubModel>>{
    return this.http.get<Array<ClubModel>>(`${apiURL}/clubs`);
  }

  getAllJobs() : Observable<Array<JobModel>>{
    return this.http.get<Array<JobModel>>(`${apiURL}/jobs`);
  }

  getAllSubjects() : Observable<Array<SubjectModel>>{
    return this.http.get<Array<SubjectModel>>(`${apiURL}/subjects`);
  }

  getAllInterests() : Observable<Array<InterestModel>>{
    return this.http.get<Array<InterestModel>>(`${apiURL}/interests`);
  }

  postSurvey(survey:SurveyModel) : Observable<SurveyModel>{
    return this.http.post<SurveyModel>(`${apiURL}/Survey`,survey);
  }

  deleteSurvey():Observable<string>{
    return this.http.delete<string>(`${apiURL}/Survey`);
  }

  getSurvey():Observable<SurveyModel>{
    return this.http.get<SurveyModel>(`${apiURL}/SortingFilter/survey`);
  }

  getUniversities(sortingSurvey:SortingSurveyModel):Observable<UniversityCardModel>{
    return this.http.post<UniversityCardModel>(`${apiURL}/SortingFilter`,sortingSurvey);
  }


}
