import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { TimeOff, TimeOffResponse } from '../model/timeOff.model';
@Injectable({
  providedIn: 'root',
})
export class TimeOffService {
  constructor(private http: HttpClient) {}
  API_URL = environment.baseURL + 'lichxinnghi';
  getAllTimeOff(): Observable<any> {
    return this.http.get(this.API_URL).pipe(
      map((data: TimeOffResponse) => {
        return data.data.map((timeOff: TimeOff) => {
          return {
            id: timeOff.id,
            userID: timeOff.user_id,
            time_start: new Date(timeOff.time_start),
            time_end: new Date(timeOff.time_end),
            date: new Date(timeOff.date),
            note: timeOff.note,
            mode_leave: timeOff.mode_leave ? timeOff.mode_leave : 0,
            numberModeLive: timeOff.number_mode_leave,
            numberDayLeave: timeOff.number_day_leave,
            status: timeOff.status,
            fullName: timeOff.full_name,
          };
        });
      })
    );
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
  paginateTime(page: string): Observable<any> {
    return this.http.get(this.API_URL, { params: { page } });
  }
  getAllByUser(): Observable<any> {
    return this.http.get(this.API_URL + '/getAllByUser/');
  }
  getAllDelete(): Observable<any> {
    return this.http.get(this.API_URL + '/getAllDelete/');
  }
  destroyTimeOff(id: string): Observable<any> {
    return this.http.delete(this.API_URL + '/destroy/' + id);
  }
  restoreTimeOff(id: string, object: any): Observable<any> {
    return this.http.post(this.API_URL + '/khoi_phuc/' + id, object);
  }
  destroyAllTimeOff(object: any): Observable<any> {
    return this.http.post(this.API_URL + '/destroy_all', object);
  }
}
