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
  getAllTimeOff(): Observable<any> {
    // if (keyword.length > 0) {
    //   return this.http.get(this.API_URL + '?keyword=' + keyword);
    // }
    return this.http.get(this.API_URL);
  }
  createTimeOff(object: any): Observable<any> {
    return this.http.post<any>(this.API_URL + '/create/', object);
  }
  getDetailTimeOff(id: string): Observable<any> {
    return this.http.get(this.API_URL + '/getdetail/' + id, {});
  }
  deleteTimeOff(id: string): Observable<any> {
    return this.http.delete(this.API_URL + '/delete/' + id, {});
  }
  updateTimeOff(id: string, object: any): Observable<any> {
    return this.http.post(this.API_URL + '/update_leave/' + id, { object });
  }
  getTotalDay(): Observable<any> {
    return this.http.get(this.API_URL + '/total_day/', {});
  }
  paginateTime(page:string): Observable<any>{
    return this.http.get(this.API_URL,{params:{page}});
  }
  getAllByUser(): Observable<any> {
    return this.http.get(this.API_URL + '/getAllByUser/', {});
  }
}
