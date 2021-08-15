import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AttendanceService } from 'src/app/service/attendance.service';
import { EmployeeService } from 'src/app/service/employee.service';
import { ToastsService } from 'src/app/service/toasts.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-attendance-form',
  templateUrl: './attendance-form.component.html',
  styleUrls: ['./attendance-form.component.css']
})
export class AttendanceFormComponent implements OnInit {

  formAttendance: FormGroup;
  listItem = [];
  idAtten: string;
  constructor(private listEmployeeService: EmployeeService,
    private attendanceService: AttendanceService,
    private toastService: ToastsService,
    private atr: ActivatedRoute,) {
    this.formAttendance = this.createForm()
    }
  ngOnInit(): void {
    this.atr.params.subscribe((params) => {
      this.idAtten = params.id;
      if (this.idAtten) {
        this.attendanceService.getDetailOT(this.idAtten).subscribe((data) => {
          this.formAttendance.setValue({
            user_id: data.data.id,
            time_of_check_in: data.data.time_of_check_in,
            time_of_check_out: data.data.time_of_check_out,
            date_of_work: data.data.date_of_work,
            status: data.data.status
          })
        })
      }
    })
    this.getAllUser()
  }
  getAllUser() {
    this.listEmployeeService.getAllEmployee().subscribe((data) => {
      console.log(data);
      this.listItem = data.data

    })
  }
  createForm() {
    return new FormGroup({
      user_id: new FormControl('', Validators.required),
      time_of_check_in: new FormControl('', Validators.required),
      time_of_check_out: new FormControl('', Validators.required),
      date_of_work: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
    })
  }

  handleSubmit() {
    if (this.idAtten) {
      this.attendanceService.updateAttendance(this.idAtten, this.formAttendance.value).subscribe((data) => {
        this.toastService.show(data.message, {
          classname: 'bg-success text-light',
          delay: 3000
        }),
          (err: any) => {
            this.toastService.show(err.message, {
              classname: 'bg-danger text-light',
              delay: 3000
            })
          }
      })
    }
    this.attendanceService.createAttendance(this.formAttendance.value).subscribe((data) => {
      console.log(data);
      this.toastService.show(data.message, {
        classname: 'bg-success text-light',
        delay: 3000
      }),
        (err: any) => {
          this.toastService.show(err.message, {
            classname: 'bg-danger text-light',
            delay: 3000
          })
        }
    })
  }
}
