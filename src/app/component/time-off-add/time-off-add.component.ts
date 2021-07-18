import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';

import { Router,ActivatedRoute } from '@angular/router';
import { TimeOffService } from 'src/app/service/time-off.service';
import { TimeOff } from 'src/app/model/timeOff.model'


@Component({
  selector: 'app-time-off-add',
  templateUrl: './time-off-add.component.html',
  styleUrls: ['./time-off-add.component.css']
})
export class TimeOffAddComponent implements OnInit {
  TimeOffForm: FormGroup
  check:boolean=false
 constructor(
    private timeoffservice: TimeOffService,
   private router: Router,

  ) {
    this.TimeOffForm = this.createForm();
  }

  ngOnInit(): void {

  }

  createForm() {
    return new FormGroup({
      time_start: new FormControl(),
      time_end: new FormControl(),
      note: new FormControl(),
      mode_leave: new FormControl(),
      number_day: new FormControl()
    })
  }


  get f() {
    return this.TimeOffForm.controls;
  }
  submitForm(event) {
    event.preventDefault();
    this.timeoffservice.createTimeOff(this.TimeOffForm.value).subscribe(data => {
       this.router.navigate(['/','time-off'])
    })
  }
}
