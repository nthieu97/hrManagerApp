import { Component, OnInit } from '@angular/core';
import { AttendanceService } from 'src/app/service/attendance.service';
import { OTServiceService } from 'src/app/service/otservice.service';
import { ToastsService } from 'src/app/service/toasts.service';

@Component({
  selector: 'app-list-ot',
  templateUrl: './list-ot.component.html',
  styleUrls: ['./list-ot.component.css'],
})
export class ListOtComponent implements OnInit {
  listOT = [];
  loading = false;
  page = 1;
  pageSize;
  collectionSize;

  constructor(
    private attenService: AttendanceService,
    private otService: OTServiceService,
    private toastService: ToastsService
  ) {}

  ngOnInit(): void {
    this.attenService.getListOT().subscribe((data) => {
      this.listOT = data.data;
      this.page = data.meta.currentPage;
      this.collectionSize = data.meta.total;
      this.pageSize = data.meta.perPage;
    });
  }
  handlePaginate(event): void {
    this.loading = true;
    this.attenService.getListOT(String(event)).subscribe((data) => {
      this.listOT = data.data;
      this.loading = false;
    });
  }
  handleDelete(id: string): void {
    const conf = confirm('you definitely want to delete');
    if (conf) {
      this.otService.deleteOT(id).subscribe(
        (data) => {
          this.toastService.show(data.message, {
            classname: 'bg-success text-light',
            delay: 3000,
          }),
            console.log(data);
        },
        (err: any) => {
          this.toastService.show(err.message, {
            classname: 'bg-danger text-light',
            delay: 3000,
          });
        }
      );
    }
  }
}
