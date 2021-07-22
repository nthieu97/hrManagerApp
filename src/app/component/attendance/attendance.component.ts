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
  pageSize;
  collectionSize = 5;
  idUser;
  ngOnInit(): void {
    this.idUser = this.authService.getIdUserAuthenticated();
    this.search();
  }
  keyword: string = '';
  search() {
    this.attendanceService.getAllAttendance(this.keyword).subscribe((data) => {
      this.attendanceData = data.data;
      this.page = data.meta.currentPage;
      this.collectionSize = data.meta.total;
      this.pageSize = data.meta.perPage;
      console.log(this.keyword);
      console.log(data);
    });
  }
  // tslint:disable-next-line: typedef
  handlePaginate(event) {
    this.loading = true;
    this.attendanceService
      .paginateAttendance(String(event))
      .subscribe((data) => {
        this.attendanceData = data.data;
        this.loading = false;
      });
  }
}
