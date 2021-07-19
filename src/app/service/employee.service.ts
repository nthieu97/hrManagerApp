import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}
  URL_API = environment.baseURL + 'user';
  getAllEmployee(page?: string): Observable<any> {
    return this.http.get(this.URL_API, { params: { page } });
  }
  getUserById(id: string): Observable<any> {
    return this.http.get(this.URL_API + '/getdetail/' + id);
  }
  deleteEmployee(id: string): Observable<any> {
    return this.http.delete(this.URL_API + '/delete/' + id);
  }
  getAllDepartmentPositions(): Observable<any> {
    return this.http.get(this.URL_API + 'getlist');
  }
}
