import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import { AttendanceService } from 'src/app/service/attendance.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css'],
})
export class AttendanceComponent implements OnInit {
  constructor(
    private attendanceService: AttendanceService,
    private authService: AuthService
  ) {}
  attendanceData;
  loading = false;
  page = 1;
  pageSize;
  collectionSize;
  ngOnInit(): void {
    this.attendanceService.getMyAttendance().subscribe((data) => {
      this.attendanceData = data.data;
    });
  }
  handlePaginate(event): void {
    this.loading = true;
    this.attendanceService
    .paginateatten(String(event))
    .subscribe((data) => {
      this.attendanceData = data.data;
      this.loading = false;
    });
      
  }
}
