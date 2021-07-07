import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { loginResponse } from '../../model/auth.model';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {}
  onSubmit(value): void {
    this.authService
      .login(value.email, value.password)
      .subscribe((data: loginResponse) => {
        const token = data.access_token;
        localStorage.setItem('token', token);
        this.router.navigate(['/']);
      });
  }
}
