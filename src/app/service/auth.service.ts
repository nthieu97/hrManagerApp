import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { loginResponse } from '../model/auth.model';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  user = new BehaviorSubject<User>(null);
  login(email, password): Observable<loginResponse> {
    return this.http
      .post(environment.baseURL + 'login', { email, password })
      .pipe(
        tap((data: loginResponse) => {
          this.user.next(data.user);
        })
      );
  }
  checkLogin(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    }
    return false;
  }
  logOut(): void {
    this.user.next(null);
    localStorage.removeItem('token');
  }
}
