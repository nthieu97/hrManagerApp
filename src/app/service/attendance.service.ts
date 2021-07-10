import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  constructor(private http: HttpClient) {}
  URL_API = environment.baseURL + 'lichchamcong';
  handleAttendance(qrcode: string): Observable<any> {
    return this.http.post(this.URL_API + '/diemdanh', { code_QR: qrcode });
  }
  getAttendanceDetailById(id: string): Observable<any> {
    return this.http.get(this.URL_API + '/getdetail/' + id);
  }
  getAllAttendance(): Observable<any> {
    return this.http.get(this.URL_API);
  }
}
