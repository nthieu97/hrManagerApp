import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { ForgotPasswordService } from 'src/app/service/forgot-password.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  ForgotPass: FormGroup;
  email: string;
  listUser;
  constructor(private forgotService:ForgotPasswordService) { }

  ngOnInit(): void {
    this.ForgotPass = this.createForm()
  }
  createForm() {
    return new FormGroup({
      email:new FormControl('',Validators.required)
    })
  }
  get f() {
  return this.ForgotPass.controls
  }
  submitForm(value) {
    this.forgotService.ForgotPassword(this.ForgotPass.value).subscribe((data) => {
      console.log(data);
    })
  }
}
