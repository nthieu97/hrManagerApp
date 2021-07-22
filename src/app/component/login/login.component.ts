import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { loginResponse } from 'src/app/model/auth.model';
import { ToastsService } from 'src/app/service/toasts.service';

import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loading = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: ToastsService
  ) {}
  ngOnInit(): void {}
  onSubmit(value): void {
    this.loading = true;
    this.authService.login(value.email, value.password).subscribe(
      (data: loginResponse) => {
        this.toast.show(`Xin chao ${data.user.user_account}`, {
          classname: 'bg-success text-light',
          delay: 3000,
        });
      },
      (err) => {
        this.loading = false;
        this.toast.show('Sai Tài khoản hoặc mật khẩu , Xin vui lòng thử lại', {
          classname: 'bg-danger text-light',
          delay: 3000,
        });
      }
    );
  }
}
