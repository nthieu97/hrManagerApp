import { Component, OnInit } from '@angular/core';
import { AttendanceService } from 'src/app/service/attendance.service';

@Component({
  selector: 'app-list-ot',
  templateUrl: './list-ot.component.html',
  styleUrls: ['./list-ot.component.css'],
})
export class ListOtComponent implements OnInit {
  listOT = [];
  loading = false;
  page = 1;
  pageSize = 10;
  collectionSize = 49;

  constructor(private attenService: AttendanceService) {}

  ngOnInit(): void {
    this.attenService.getListOT().subscribe((data) => {
      console.log(data);
      this.listOT = data.data;
      this.page = data.meta.currentPage;
      this.collectionSize = data.meta.total;
      this.pageSize = data.meta.perPage;
    });
  }
  handlePaginate(event) {
    this.loading = true;
    // this.attenService.paginateAttendance(String(event)).subscribe((data) => {
    //   this.listOT = data.data;
    //   this.loading = false;
    // });
  }
}
