import { Component, OnInit } from '@angular/core';
import { AttendanceService } from 'src/app/service/attendance.service';

@Component({
  selector: 'app-atendance-analytics',
  templateUrl: './atendance-analytics.component.html',
  styleUrls: ['./atendance-analytics.component.css'],
})
export class AtendanceAnalyticsComponent implements OnInit {
  listAllAtten=[]
  constructor(private attenService:AttendanceService) {}
  // tslint:disable-next-line: variable-name
  multi = [
    {
      name: 'thu hai',
      series: [
        {
          name: 'di lam',
          value: 22,
        },
        {
          name: 'ko di lam',
          value: 1,
        },
      ],
    },

    {
      name: 'thu ba',
      series: [
        {
          name: 'di lam',
          value: 21,
        },
        {
          name: 'ko di lam',
          value: 2,
        },
      ],
    },

    {
      name: 'thu tu ',
      series: [
        {
          name: 'di lam',
          value: 20,
        },
        {
          name: 'ko di lam',
          value: 3,
        },
      ],
    },
    {
      name: 'thu nam',
      series: [
        {
          name: 'di lam',
          value: 17,
        },
        {
          name: 'ko di lam',
          value: 6,
        },
      ],
    },
    {
      name: 'thu sau',
      series: [
        {
          name: 'di lam',
          value: 23,
        },
        {
          name: 'ko di lam',
          value: 0,
        },
      ],
    },
    {
      name: 'thu bay',
      series: [
        {
          name: 'di lam',
          value: 23,
        },
        {
          name: 'ko di lam',
          value: 0,
        },
      ],
    },
  ];
  single = [
    {
      name: 'di lam',
      value: 12,
    },
    {
      name: 'nghi',
      value: 6,
    },
    {
      name: 'lam o nha ',
      value: 4,
    },
  ];
  emplyee = [
    {
      name: 'hieunt39',
      value: 12,
    },
    {
      name: 'tuansd7392',
      value: 6,
    },
    {
      name: 'hung38',
      value: 8,
    },
  ];
  colorScheme = {
    domain: ['#5AA454', '#C7B42C', '#AAAAAA'],
  };
  ngOnInit(): void {
    this.attenService.getAllAttendance().subscribe((data) => {
      console.log(data);
      this.listAllAtten = data.data
    })
  }
  // tslint:disable-next-line: typedef
  onSelect(event) {
    console.log(event);
  }


}
