import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

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
  getAttendanceDetailById(id: string): Observable<any> {
    return this.http.get(this.URL_API + '/getdetail/' + id);
  }
  getAllAttendance(): Observable<any> {
    // if (keyword.length > 0) {
    //   return this.http.get(this.URL_API + '?keyword=' + keyword);
    // }
    return this.http.get(this.URL_API);
  }
  paginateAttendance(page: string): Observable<any> {
    return this.http.get(this.URL_API, { params: { page } });
  }

  getListByUser(): Observable<any> {
    return this.http.get(this.URL_API + '/getListByUser/', {});
  }

  getListOT(): Observable<any> {
    return this.http.get(this.URL_API + '/getListOt/', {});
  }

  getDetailOT(id: string): Observable<any> {
    return this.http.get(this.URL_API + '/getdetail/' + id);
  }

  updateOT(object: any): Observable<any> {
    return this.http.post(this.URL_API + '/update_OT/', { object });
  }
}
