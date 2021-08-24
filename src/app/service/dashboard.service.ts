import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  URL_API = environment.baseURL + 'dashboard/';
  constructor(private http: HttpClient, private router: Router) {}
  showTotal(): Observable<any> {
    return this.http.get(this.URL_API + 'show_total');
  }
  showListConfirm(): Observable<any> {
    return this.http.get(this.URL_API + 'list_comfig');
  }
  acceptLeave(id: string): Observable<any> {
    return this.http.post(this.URL_API + 'comfig/' + id, { yes: 'yes' });
  }
  rejectLeave(id: string): Observable<any> {
    return this.http.post(this.URL_API + 'comfig/' + id, {});
  }
  totalUserTeam(): Observable<any> {
    return this.http.get(this.URL_API + 'total_user_team_work_leave');
  }
  getSalaryByMonth(): Observable<any> {
    return this.http.get(this.URL_API + 'luong_theo_thang');
  }
  getTotalUserByDepartment(): Observable<any> {
    return this.http.get(this.URL_API + 'total_user_in_phong_ban');
  }
  getTotalUser(): Observable<any> {
    return this.http.get(this.URL_API + 'total_user');
  }
  getTotalPhongban(): Observable<any> {
    return this.http.get(this.URL_API + 'total_phong_ban');
  }
  getTotalUserWorker(): Observable<any> {
    return this.http.get(this.URL_API + 'total_user_work');
  }
  getTotalUserOff(): Observable<any> {
    return this.http.get(this.URL_API + 'total_user_off');
  }
  getAllDepartment(): Observable<any> {
    return this.http.get(this.URL_API + 'total_phong_ban');
  }
  listNotify(): Observable<any> {
    return this.http.get(this.URL_API + 'list_notyfi');
  }
  detailNotify(id: string): Observable<any> {
    return this.http.get(this.URL_API + 'detail_notyfi/' + id, {});
  }
  countNotify(): Observable<any> {
    return this.http.get(this.URL_API + 'count_notyfi');
  }
}
