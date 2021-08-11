import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private http: HttpClient) { }
  API_URL = environment.baseURL + 'forget_password';
  ForgotPassword(object:any):Observable<any> {
    return this.http.post(this.API_URL , object);
  }
}
