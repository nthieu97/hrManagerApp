import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastsService } from 'src/app/service/toasts.service';
import { AttendanceService } from 'src/app/service/attendance.service';

import { ExportExcelService } from 'src/app/service/export-excel.service';
export interface AttendanceMap {
  id: number;
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
  fileName = '';
  loadingFilter = false;
  loadingImport = false;
  filterParam: HttpParams = new HttpParams();
  cols: { field: string; header: string }[];
  constructor(
    private attenService: AttendanceService,
    private excel: ExportExcelService,
    private toastService: ToastsService
  ) {}

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
  onFileSelect(event) {
    const file: File = event.target.files[0];

    if (file) {
      this.loadingImport = true;
      this.fileName = file.name;

      const formData = new FormData();

      formData.append('file', file, file.name);
      this.attenService.importTable(formData).subscribe(
        (data) => {
          this.toastService.show(data.message, {
            classname: 'bg-success text-light',
            delay: 3000,
          });
          this.loadingImport = false;
          this.attenService
            .getAllAttendance(this.filterParam)
            .subscribe((data) => {
              this.atendances = data;
            });
          this.fileName = '';
        },
        (err) => {
          this.loadingImport = false;
          this.toastService.show(err.message, {
            classname: 'bg-danger text-light',
            delay: 3000,
          });
          this.fileName = '';
        }
      );
    }
  }
  exportExcel(): void {
    this.excel.exportExcel(this.atendances, 'diemdanh');
  }

  handleDelete(id: string): void {}

  handleFilter(event): void {
    this.loadingFilter = true;
    this.filterParam = this.filterParam.set('date', String(event.month));
    this.filterParam = this.filterParam.set('year', String(event.year));
    this.attenService.getAllAttendance(this.filterParam).subscribe((data) => {
      this.atendances = data;
      this.loadingFilter = false;
    });
  }
}
