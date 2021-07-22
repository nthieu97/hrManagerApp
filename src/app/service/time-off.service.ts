import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class TimeOffService {
  constructor(private http: HttpClient) {}
  API_URL = environment.baseURL + 'lichxinnghi';
  getAllTimeOff(keyword: any): Observable<any> {
    if (keyword.length > 0) {
      return this.http.get(this.API_URL + '?keyword=' + keyword);
    }
    return this.http.get(this.API_URL);
  }
  createTimeOff(object: any): Observable<any> {
    return this.http.post<any>(this.API_URL + '/create/', object);
  }
  getDetailTimeOff(id: string): Observable<any> {
    return this.http.get(this.API_URL + '/getdetail/' + id);
  }
  deleteTimeOff(id: string): Observable<any> {
    return this.http.post(this.API_URL + '/delete/' + id, {});
  }
  updatePosition(id: string): Observable<any> {
    return this.http.post(this.API_URL + '/update/' + id, {});
  }
}
