import { Component, OnInit } from '@angular/core';
import { AttendanceService } from 'src/app/service/attendance.service';
import { ExportExcelService } from 'src/app/service/export-excel.service';

@Component({
  selector: 'app-atendance-analytics',
  templateUrl: './atendance-analytics.component.html',
  styleUrls: ['./atendance-analytics.component.css'],
})
export class AtendanceAnalyticsComponent implements OnInit {
  listAllAtten = [];

  constructor(
    private attenService: AttendanceService,
    private excel: ExportExcelService
  ) {}
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
  loading = false;
  page = 1;
  pageSize: number;
  collectionSize: number;
  ngOnInit(): void {
    this.attenService.getAllAttendance().subscribe((data) => {
      this.listAllAtten = data.data;
      this.page = data.meta.currentPage;
      this.collectionSize = data.meta.total;
      this.pageSize = data.meta.perPage;
    });
  }
  expoetExcel(): void {
    this.excel.exportExcel(this.listAllAtten, 'diemdanh');
  }
  handlePaginate(event): void {
    this.loading = true;
    const page = String(event);
    this.attenService.getAllAttendance(page).subscribe((data) => {
      this.loading = false;
      this.listAllAtten = data.data;
    });
  }
  handleDelete(id:string){
    
  }
}
