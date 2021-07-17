import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Employee} from 'src/app/model/employee.model'
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}
  URL_API = environment.baseURL + 'user';
  getAllEmployee(): Observable<any> {
    return this.http.get(this.URL_API);
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
  store(object: Employee): Observable<Employee>{
    return this.http.post<Employee>(this.URL_API+'/create',object)
  }

}
