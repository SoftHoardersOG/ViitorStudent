import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiURL } from 'src/environments/environment';
import { AutocompleteModel } from '../models/autocomplete.model';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteService {

  constructor(private http:HttpClient) {
   }
   public getOptionAutocomplete<T>( autocomplete :AutocompleteModel,path:string ) : Observable<Array<T>>{
   return  this.http.post<Array<T>>(`${apiURL}/Autocomplete/${path}`,autocomplete);
  }
}
