import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css'],
})
export class AttendanceComponent implements OnInit {
  constructor() {}
  arr: any[] = [
    {
      date: '2021-06-27',
      display: 'background',
      color: 'green',
    },
    {
      date: '2021-06-30',
      display: 'background',
      color: 'red',
    },
    {
      date: '2021-06-29',
      display: 'background',
      color: 'green',
    },
    {
      date: '2021-06-28',
      display: 'background',
      color: 'red',
    },
  ];
  calendarOptions: CalendarOptions = {
    height: 550,
    initialView: 'dayGridMonth',
    // dateClick: this.handleDateClick.bind(this), // bind is important!
    events: this.arr,
  };

  ngOnInit(): void {}
}
