import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SalariesResponse, Salary } from '../model/salaries.model';

@Injectable({
  providedIn: 'root',
})
export class SalaryService {
  constructor(private http: HttpClient) {}
  URL_API = environment.baseURL + 'luong';
  getAllSalary(params: HttpParams): Observable<any> {
    return this.http.get(this.URL_API, { params }).pipe(
      map((res: SalariesResponse) => {
        return res.data.map((salary: Salary) => {
          return {
            id: salary.id,
            userID: salary.user_id,
            name: salary.full_name,
            gross: salary.total_gross_salary,
            net: salary.total_net_salary,
            leave: salary.total_salary_leave,
            date: new Date(salary.date),
            status: salary.status,
          };
        });
      })
    );
  }
  getSalaryDetail(id: string): Observable<any> {
    return this.http.get(this.URL_API + '/getdetail/' + id);
  }
  getSalaryByUser(page?: string): Observable<any> {
    return this.http.get(this.URL_API + '/getSalaryByUser', {
      params: { page },
    });
  }
  paymentSalary(id: string): Observable<any> {
    return this.http.post(this.URL_API + '/tra_luong/' + id, {});
  }
}
