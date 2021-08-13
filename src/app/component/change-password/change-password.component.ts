import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/service/employee.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  new_password: string;
  comfig_password: string;
  constructor(
    private employessService: EmployeeService,
    private router: Router,
    private authService: AuthService
  ) {}
  ChangePass: FormGroup;
  ngOnInit(): void {
    this.ChangePass = this.createForm();
  }

  createForm(): FormGroup {
    return new FormGroup({
      current_password: new FormControl('', [Validators.required]),
      new_password: new FormControl('', [Validators.required]),
      comfig_password: new FormControl('', [Validators.required]),
    });
  }
  get f() {
    return this.ChangePass.controls;
  }
  submitForm(value): void {
    this.employessService
      .ChangePassword(this.ChangePass.value)
      .subscribe(() => {
        if (
          this.ChangePass.value.new_password ===
          this.ChangePass.value.comfig_password
        ) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Change Password Successfully',
            showConfirmButton: false,
            timer: 1500,
          });
          this.router.navigate(['/', 'login']);
          this.authService.logOut();
        } else {
          Swal.fire({
            icon: 'error',
            title: '',
            text: 'Password incorrect',
            footer: '',
          });
        }
      });
  }
}
