import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/service/employee.service';
import  Swal  from 'sweetalert2'
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(
    private employessService: EmployeeService,
    private router:Router
  ) { }
  TimeOffForm: FormGroup
  ngOnInit(): void {
    this.TimeOffForm = this.createForm()
  }
  onSubmit(value) {

  }
  createForm() {
    return new FormGroup({
      current_password: new FormControl('', [Validators.required]),
      new_password: new FormControl('', [Validators.required]),
      comfig_password: new FormControl('', [Validators.required]),

    })
  }
  submitForm(event) {
    event.preventDefault();
    this.employessService.ChangePassword(this.TimeOffForm.value).subscribe(data => {
      console.log(data);
    Swal.fire({
  position: 'top-end',
  icon: 'success',
  title: 'Change Password Successfully',
  showConfirmButton: false,
  timer: 1500
})
      this.router.navigate(['/', 'login'])
    })
    //  console.log(this.TimeOffForm.value);
  }
}
