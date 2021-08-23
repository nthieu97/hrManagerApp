import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AttendanceService } from 'src/app/service/attendance.service';
import { EmployeeService } from 'src/app/service/employee.service';
import { ExportExcelService } from 'src/app/service/export-excel.service';
export interface AttendanceMap {
  userID: string;
  name: string;
  OT: number;
  date: string;
  checkIn: string;
  checkOut: string;
  status: number;
}
@Component({
  selector: 'app-atendance-analytics',
  templateUrl: './atendance-analytics.component.html',
  styleUrls: ['./atendance-analytics.component.css'],
})
export class AtendanceAnalyticsComponent implements OnInit {
  atendances: AttendanceMap[];
  cols: { field: string; header: string }[];
  constructor(
    private attenService: AttendanceService,
    private excel: ExportExcelService
  ) {}

  loading = false;

  first = 0;
  rows = 10;
  ngOnInit(): void {
    this.cols = [
      { field: 'userID', header: 'ID nhân viên' },
      { field: 'name', header: 'Tên nhân viên' },
      { field: 'date', header: 'Ngày ' },
      { field: 'checkIn', header: 'Giờ vào' },
      { field: 'checkOut', header: 'Giờ ra' },
      { field: 'OT', header: 'Làm thêm' },
      { field: 'status', header: 'Trạng thái' },
    ];
  }
  exportExcel(): void {
    this.excel.exportExcel(this.atendances, 'diemdanh');
  }

  handleDelete(id: string): void {}

  handleFilter(event): void {
    let param = new HttpParams();
    param = param.set('date', String(event.month));
    param = param.set('year', String(event.year));
    this.attenService.getAllAttendance(param).subscribe((data) => {
      this.atendances = data;
    });
  }
}
