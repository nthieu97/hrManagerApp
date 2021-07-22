import { Component, OnInit } from '@angular/core';
import { TimeOffService } from 'src/app/service/time-off.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-time-off',
  templateUrl: './time-off.component.html',
  styleUrls: ['./time-off.component.css'],
})
export class TimeOffComponent implements OnInit {
  constructor(private timeOffService: TimeOffService, private router: Router) {}

  timeOff;
  ngOnInit(): void {
    this.search();
  }
  keyword: string = '';
  search() {
    this.timeOffService.getAllTimeOff(this.keyword).subscribe((data) => {
      this.timeOff = data.data;
      console.log(this.keyword);
      console.log(data);
    });
  }
}
