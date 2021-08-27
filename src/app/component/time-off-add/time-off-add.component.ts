import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  AbstractControl,
  FormGroup,
} from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { TimeOffService } from 'src/app/service/time-off.service';
import { TimeOff } from 'src/app/model/timeOff.model';
import { TimeOffResponse } from 'src/app/model/timeOff.model';
import { ToastsService } from 'src/app/service/toasts.service';

@Component({
  selector: 'app-time-off-add',
  templateUrl: './time-off-add.component.html',
  styleUrls: ['./time-off-add.component.css'],
})
export class TimeOffAddComponent implements OnInit {
  TimeOffForm: FormGroup;
  check = false;
  idTimeOff: string;
  totalDay: number;
  totalDayOff: number;
  today = new Date();
  checkTimeStart=[];
  checkTimeEnd=[];
  timeOff=[]
  constructor(
    private timeoffservice: TimeOffService,
    private router: Router,
    private atr: ActivatedRoute,
    private toastService: ToastsService
  ) {}

  getTotalDay(): void {
    this.timeoffservice.getTotalDay().subscribe((data) => {
      this.totalDay = Number(data.data.total_day);
      this.totalDayOff = Number(
        data.data.total_day_off ? data.data.total_day_off : 0
      );
    });
  }

  ngOnInit(): void {
    
    this.today.setDate(this.today.getDate() + 1);
    this.TimeOffForm = this.createForm();
    this.atr.params.subscribe((params) => {
      this.idTimeOff = params.id;
      if (this.idTimeOff) {
        this.timeoffservice
          .getDetailTimeOff(this.idTimeOff)
          .subscribe((data) => {
            this.TimeOffForm.setValue({
              time_start: data.data.time_start,
              time_end: data.data.time_end,
              note: data.data.note,
              mode_leave: data.data.mode_leave,
              number_day: data.data.number_mode_leave,
            });
          });
      }
    });

    this.getTotalDay();
    this.getAllTimeOff()
  }

  createForm(): FormGroup {
    return new FormGroup({
      time_start: new FormControl('', [Validators.required]),
      time_end: new FormControl('', [Validators.required]),
      note: new FormControl('', [Validators.required]),
      mode_leave: new FormControl(''),
      number_day: new FormControl('', [Validators.max(this.totalDay - this.totalDayOff), Validators.min(0)]),
    });
  }

  get f(): {
    [key: string]: AbstractControl;
  } {
    return this.TimeOffForm.controls;
  }
  getAllTimeOff() {
    this.timeoffservice.getAllByUser().subscribe((data) => {
      this.timeOff = data.data
      for (let i = 0; i < this.timeOff.length; i++) {
        this.checkTimeStart.push(this.timeOff[i].time_start)
        this.checkTimeEnd.push(this.timeOff[i].time_end)
      }
    });
  }
  equarDateStart(event) {
    this.checkTimeStart.map((item) => {
      if (item == event.target.value) {
        document.querySelector('.error').innerHTML = "Bạn đã chọn trùng ngày, vui lòng nhập lại"
      }
    })
  }
  equarDateEnd(event) {
    this.checkTimeEnd.map((item) => {
      if (item == event.target.value) {
        document.querySelector('.error2').innerHTML = "Bạn đã chọn trùng ngày, vui lòng nhập lại"
      }
    })
  }
  submitForm(): void {
    if (this.TimeOffForm.value.number_day > 0) {
      this.TimeOffForm.value.mode_leave = true
    } else {
      this.TimeOffForm.value.mode_leave = false
    }
    if (this.idTimeOff) {
      this.timeoffservice
        .updateTimeOff(this.idTimeOff, this.TimeOffForm.value)
        .subscribe(
          (data) => {
            this.toastService.show(data.message, {
              classname: 'bg-success text-light',
              delay: 3000,
            }),
              this.router.navigate(['/', 'my-time-off']);
          },
          (err: any) => {
            this.toastService.show(err.message, {
              classname: 'bg-danger text-light',
              delay: 3000,
            });
          }
        );
    }
    this.timeoffservice.createTimeOff(this.TimeOffForm.value).subscribe(
      (data) => {
        this.toastService.show(data.message, {
          classname: 'bg-success text-light',
          delay: 3000,
        }),
          this.router.navigate(['/', 'my-time-off']);
      },
      (err: any) => {
        this.toastService.show(err.message, {
          classname: 'bg-danger text-light',
          delay: 3000,
        });
      }
    );
  }
}
