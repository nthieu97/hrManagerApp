import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee, EmployeeRequestBody } from 'src/app/model/employee.model';
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
  store(object: EmployeeRequestBody): Observable<Employee> {
    return this.http.post<Employee>(this.URL_API + '/create', object);
  }

  getListUser(): Observable<any> {
    return this.http.get(this.URL_API + '/getListUser');
  }

  getAllUser(): Observable<any> {
    return this.http.get(this.URL_API + '/listAll');
  }
  ChangePassword(object: any): Observable<any> {
    return this.http.post(this.URL_API + '/changepassword', object);
  }
}
