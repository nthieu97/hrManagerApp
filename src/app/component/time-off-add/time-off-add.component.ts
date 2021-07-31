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
  today  = new Date();
  
 
  constructor(
    private timeoffservice: TimeOffService,
    private router: Router,
    private atr: ActivatedRoute,
    private toastService:ToastsService
  ) {}

  getTotalDay(): void {
    
    this.timeoffservice.getTotalDay().subscribe((data) => {
      this.totalDay = Number(data.data.total_day);
      this.totalDayOff = Number(
        data.data.totalDayOff ? data.data.total_day_off : 0
      );
    });
  }
 
  ngOnInit(): void {
    this.today.setDate(this.today.getDate()+1)
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
              number_day: data.data.number_day_leave,
            });
          });
      }
    });

    this.getTotalDay();
  }
  showPaidLeave(): void {
    this.check = !this.check;
  }
  createForm(): FormGroup {
    return new FormGroup({
      time_start: new FormControl('', [Validators.required]),
      time_end: new FormControl('', [Validators.required]),
      note: new FormControl('', [Validators.required]),
      mode_leave: new FormControl('', [Validators.required]),
      number_day: new FormControl('', [Validators.required]),
    });
  }

  get f(): {
    [key: string]: AbstractControl;
  } {
    return this.TimeOffForm.controls;
  }
  submitForm(): void {
    if (this.idTimeOff) {
      this.timeoffservice
        .updateTimeOff(this.idTimeOff, this.TimeOffForm.value)
        .subscribe((data) => {
          this.toastService.show(data.message,{
            classname:'bg-success text-light',
            delay:3000
          }),
          (err:any)=> {
            this.toastService.show(err.message,{
              classname:'bg-danger text-light',
              delay:3000
            })
          }
          this.router.navigate(['/', 'my-time-off']);
        });
    }
    this.timeoffservice
      .createTimeOff(this.TimeOffForm.value)
      .subscribe((data) => {
        this.toastService.show(data.message,{
          classname:'bg-success text-light',
          delay:3000
        }),
        (err:any)=> {
          this.toastService.show(err.message,{
            classname:'bg-danger text-light',
            delay:3000
          })
        }
        this.router.navigate(['/', 'my-time-off']);
      });
  }
}
