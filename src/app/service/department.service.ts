import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor(private http: HttpClient) {}
  API_URL = environment.baseURL + 'phongban';
  createDepartment(name: string): Observable<any> {
    return this.http.post(this.API_URL + '/create', { name });
  }
  updateDepartment(id: string, name: string): Observable<any> {
    return this.http.post(this.API_URL + '/update/' + id, { name });
  }
  deleteDepartment(id: string): Observable<any> {
    return this.http.delete(this.API_URL + '/delete/' + id, {});
  }
  getDepartment(id: string): Observable<any> {
    return this.http.get(this.API_URL + '/getdetail/' + id);
  }
  getAllDepartment(): Observable<any> {
    return this.http.get(this.API_URL);
  }
}
