import { Component, OnInit } from '@angular/core';
import { TimeOffService } from 'src/app/service/time-off.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastsService } from 'src/app/service/toasts.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-time-off',
  templateUrl: './time-off.component.html',
  styleUrls: ['./time-off.component.css'],
})
export class TimeOffComponent implements OnInit {
  constructor(
    private timeOffService: TimeOffService,
    private router: Router,
    private toastService: ToastsService
  ) {}
  loading = false;
  page = 1;
  pageSize;
  collectionSize;
  listID = [];
  listTimeOffDelete = [];
  timeOff;
  checks = false;
  checkAllDeletet = false;
  ngOnInit(): void {
    this.getAllTimeOff();
    this.getAllDeleteTimeOff();
  }
  checkValue(e) {
    if (e.target.checked == true) {
      this.checks = true;
      for (let i = 0; i < this.listTimeOffDelete.length; i++) {
        this.listID.push(this.listTimeOffDelete[i].id);
      }
    } else {
      this.checks = false;
      this.listID = [];
    }
  }
  timeOffTooltip(tooltip, greeting: string) {
    if (tooltip.isOpen()) {
      tooltip.close();
    } else {
      tooltip.open({ greeting });
    }
  }
  checkResult(event) {
    if (event.target.checked == true) {
      this.listID.push(parseInt(event.target.value));
    } else {
      const x = parseInt(event.target.value);
      const arr = this.listID.filter((data) => data !== x);
      this.listID = arr;
    }
  }
  getAllTimeOff() {
    this.timeOffService.getAllByUser().subscribe((data) => {
      this.timeOff = data.data;
    });
  }
  handleDelete(id: string, index): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',

        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.timeOffService.deleteTimeOff(id).subscribe(
            (data) => {
              this.toastService.show(data.message, {
                classname: 'bg-success text-light',
                delay: 3000,
              });
            },
            (err: any) => {
              this.toastService.show(err.error.message, {
                classname: 'bg-danger text-light',
                delay: 3000,
              });
            }
          );
          this.getAllTimeOff();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
      });
  }
  getAllDeleteTimeOff() {
    this.timeOffService.getAllDelete().subscribe((data) => {
      this.listTimeOffDelete = data.data;
    });
  }
  handleDestroy(id: string) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: 'Bạn chắc chắn muốn xóa vĩnh viễn',
        text: 'Không thể khôi phục sau khi xóa !',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Có',
        cancelButtonText: 'Không',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.timeOffService.destroyTimeOff(id).subscribe((data) => {
            this.toastService.show(data.message, {
              classname: 'bg-success text-light',
              delay: 3000,
            }),
              (err: any) => {
                this.toastService.show(err.error.message, {
                  classname: 'bg-danger text-light',
                  delay: 3000,
                });
              };
          });
          this.getAllDeleteTimeOff();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.getAllDeleteTimeOff();
        }
      });
  }
  handleRestore(id: string, object: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: 'Bạn chắc chắn chứ',
        text: 'Khôi phục dữ liệu',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Có',
        cancelButtonText: 'Không',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.timeOffService
            .restoreTimeOff(id, object)
            .subscribe((data) => {});
          this.getAllDeleteTimeOff();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.getAllDeleteTimeOff();
        }
      });
  }

  destroyAll() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: 'Bạn chắc chắn chứ',
        text: 'Xóa vĩnh viễn dữ liệu',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Có',
        cancelButtonText: 'Không',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.timeOffService.destroyAllTimeOff(this.listID).subscribe(
            (data) => {
              this.toastService.show(data.message, {
                classname: 'bg-success text-light',
                delay: 3000,
              });
              this.checks = false;
              this.checkAllDeletet = false;
              this.listTimeOffDelete = [];
            },
            (err: any) => {
              this.toastService.show(err.error.message, {
                classname: 'bg-danger text-light',
                delay: 3000,
              });
            }
          );
          this.getAllDeleteTimeOff();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.getAllDeleteTimeOff();
        }
      });
  }
  reloadPage(event) {
    this.getAllTimeOff();
  }
  reloadPageTrash(event) {
    this.getAllDeleteTimeOff();
  }
  handlePaginate(event): void {
    this.loading = true;
    this.timeOffService.paginateTime(String(event)).subscribe((data) => {
      this.timeOff = data.data;
      this.loading = false;
    });
  }
  handlePaginate2(event): void {
    this.loading = true;
    this.timeOffService.paginateTime(String(event)).subscribe((data) => {
      this.listTimeOffDelete = data.data;
      this.loading = false;
    });
  }
}
