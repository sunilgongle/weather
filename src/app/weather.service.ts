import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpHandler, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http:HttpClient) { }

  getData(cityname):Observable<any>{
    let url= `https://openweathermap.org/data/2.5/weather?q=${cityname}&appid=439d4b804bc8187953eb36d2a8c26a02`;
  return  this.http.get<any>(url);
  }
}
