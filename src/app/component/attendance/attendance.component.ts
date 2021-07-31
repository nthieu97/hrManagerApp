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
  loading = false;
  attendanceData;
  page = 1;
  pageSize: number;
  collectionSize: number;
  ngOnInit(): void {
    this.attendanceService.getMyAttendance().subscribe((data) => {
      this.attendanceData = data.data;
      this.page = data.meta.currentPage;
      this.collectionSize = data.meta.total;
      this.pageSize = data.meta.perPage;
    });
  }
  handlePaginate(event): void {
    this.loading = true;
    const page = String(event);
    this.attendanceService.getMyAttendance(page).subscribe((data) => {
      this.loading = false;
      this.attendanceData = data.data;
    });
  }
}
