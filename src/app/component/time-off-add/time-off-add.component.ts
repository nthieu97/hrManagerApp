import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';

import { Router,ActivatedRoute } from '@angular/router';
import { TimeOffService } from 'src/app/service/time-off.service';
import { TimeOff } from 'src/app/model/timeOff.model'
import { TimeOffResponse } from 'src/app/model/timeOff.model';

@Component({
  selector: 'app-time-off-add',
  templateUrl: './time-off-add.component.html',
  styleUrls: ['./time-off-add.component.css']
})
export class TimeOffAddComponent implements OnInit {

  TimeOffForm: FormGroup
  check: boolean = false
  idTimeOff: string
  total_day: any
  total_day_off: any;


 constructor(
    private timeoffservice: TimeOffService,
   private router: Router,
  private atr:ActivatedRoute
  ) {
   this.TimeOffForm = this.createForm();
   this.getTotalDay()
  }


  getTotalDay() {
    this.timeoffservice.getTotalDay().subscribe((data) => {
      this.total_day = data.data.total_day
      this.total_day_off=data.data.total_day_off
    })

  }
  ngOnInit(): void {
    this.atr.params.subscribe((params) => {
      this.idTimeOff = params.id
      if (this.idTimeOff) {
        this.timeoffservice.getDetailTimeOff(this.idTimeOff).subscribe((data) => {
          this.TimeOffForm.setValue({
            time_start: data.data.time_start,
            time_end: data.data.time_end,
            note: data.data.note,
            mode_leave: data.data.mode_leave,
            number_day:this.total_day - this.total_day_off
          })
        console.log( this.TimeOffForm)
        })
      }
    })
  }


  createForm() {
    return new FormGroup({
      time_start: new FormControl('',[Validators.required]),
      time_end: new FormControl('',[Validators.required]),
      note: new FormControl('',[Validators.required]),
      mode_leave: new FormControl('',[Validators.required]),
      number_day: new FormControl('',[Validators.required])
    })
  }


  get f() {
    return this.TimeOffForm.controls;
  }
  submitForm(event) {
    event.preventDefault();
    if (this.idTimeOff) {
      this.timeoffservice.updateTimeOff(this.idTimeOff,this.TimeOffForm.value).subscribe(() => {
         this.router.navigate(['/','my-time-off'])
      })
    }
    this.timeoffservice.createTimeOff(this.TimeOffForm.value).subscribe(data => {
       this.router.navigate(['/','my-time-off'])
    })
    //  console.log(this.TimeOffForm.value);
  }
}
