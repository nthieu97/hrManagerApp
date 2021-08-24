import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Atendance, ListAtendanceResponse } from '../model/attendance.model';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  constructor(private http: HttpClient) {}
  URL_API = environment.baseURL + 'lichchamcong';
  handleAttendance(qrcode: string): Observable<any> {
    return this.http.post(this.URL_API + '/diemdanh', {
      code_QR: qrcode,
    });
  }
  getMyAttendance(page?: string): Observable<any> {
    return this.http.get(this.URL_API + '/getListByUser', { params: { page } });
  }
  getAttendanceDetailById(id: string): Observable<any> {
    return this.http.get(this.URL_API + '/getdetail/' + id);
  }
  getAllAttendance(params: HttpParams): Observable<any> {
    return this.http.get(this.URL_API, { params }).pipe(
      map((res: ListAtendanceResponse) => {
        return res.data.map((atendance: Atendance) => {
          return {
            userID: atendance.user_id,
            name: atendance.full_name,
            OT: atendance.check_ot,
            date: new Date(atendance.date_of_work),
            checkIn: atendance.time_of_check_in,
            checkOut: atendance.time_of_check_out,
            status: atendance.status,
          };
        });
      })
    );
  }
  getListOT(page?: string): Observable<any> {
    return this.http.get(this.URL_API + '/getListOt/', { params: { page } });
  }
  createAttendance(object: any): Observable<any> {
    return this.http.post(this.URL_API + '/create/', object);
  }
  updateAttendance(id: string, object: any): Observable<any> {
    return this.http.post(this.URL_API + '/update/' + id, { object });
  }
  getDetailOT(id: string): Observable<any> {
    return this.http.get(this.URL_API + '/getdetail/' + id);
  }
  updateOT(object: any): Observable<any> {
    return this.http.post(this.URL_API + '/update_OT/', { object });
  }
  importTable(data: FormData): Observable<any> {
    return this.http.post(this.URL_API + '/import', data);
  }
}
