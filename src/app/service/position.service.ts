import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  constructor(private http: HttpClient) {}
  URL_API = environment.baseURL + 'chucvu';
  createPosition(name: string): Observable<any> {
    return this.http.post(this.URL_API + '/create', {
      name,
    });
  }
  updatePosition(id: string, name: string): Observable<any> {
    return this.http.post(this.URL_API + '/update/' + id, { name });
  }
  deletePosition(id: string): Observable<any> {
    return this.http.delete(this.URL_API + '/delete/' + id, {});
  }
  getPosition(id: string): Observable<any> {
    return this.http.get(this.URL_API + '/getdetail/' + id);
  }
  getAllPosition(): Observable<any> {
    return this.http.get(this.URL_API);
  }
}
