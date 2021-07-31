import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SalaryService {
  
  constructor(private http: HttpClient) {}
  URL_API = environment.baseURL + 'luong';
  getAllSalary(): Observable<any> {
  
    return this.http.get(this.URL_API )
  }
  paginateSalary(page: string) {
    // throw new Error('Method not implemented.');
    return this.http.get(this.URL_API,{params: {page}});
  }
  getSalaryDetail(id: string): Observable<any> {
    return this.http.get(this.URL_API + '/getdetail/' + id);
  }
  getMySalary():Observable<any> {
    return this.http.get(this.URL_API + '/getSalaryByUser' );
  }
}