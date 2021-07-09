import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { loginResponse } from '../model/auth.model';
import { User } from '../model/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {
    const user = JSON.parse(localStorage.getItem('user'));
    this.user.next(user);
  }
  user = new BehaviorSubject<User>(null);
  getCurrentUser(): User {
    return this.user.value;
  }
  login(email, password): Observable<loginResponse> {
    return this.http
      .post(environment.baseURL + 'login', { email, password })
      .pipe(
        tap((data: loginResponse) => {
          this.saveUserData(data);
          this.router.navigate(['/']);
        })
      );
  }
  isAdmin(): boolean {
    const role_id = this.user.value.role_id;
    if (role_id === 1 || role_id === 2) {
      return true;
    }
    return false;
  }
  saveUserData(data: loginResponse): void {
    const token = data.access_token;
    const user = data.user;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.user.next(user);
  }
  isAuthenticated(): boolean {
    const helper = new JwtHelperService();
    const token = localStorage.getItem('token');
    if (!helper.isTokenExpired(token)) {
      return true;
    }
    return false;
  }
  logOut(): void {
    this.user.next(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
