import { Component, OnInit } from '@angular/core';
import { TimeOffService } from 'src/app/service/time-off.service';

@Component({
  selector: 'app-time-off-list',
  templateUrl: './time-off-list.component.html',
  styleUrls: ['./time-off-list.component.css']
})
export class TimeOffListComponent implements OnInit {
  listTimeOff = []
  constructor(private timeOffService:TimeOffService) { }

  ngOnInit(): void {
    this.timeOffService.getAllTimeOff().subscribe((data) => {
      console.log(data);
      this.listTimeOff = data.data
    })
  }

}
