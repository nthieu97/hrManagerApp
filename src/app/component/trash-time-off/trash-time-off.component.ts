import { Component, OnInit } from '@angular/core';
import { TimeOffService } from 'src/app/service/time-off.service';
import { ToastsService } from 'src/app/service/toasts.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-trash-time-off',
  templateUrl: './trash-time-off.component.html',
  styleUrls: ['./trash-time-off.component.css'],
})
export class TrashTimeOffComponent implements OnInit {
  listTimeOffDelete = [];
  constructor(
    private timeOffService: TimeOffService,
    private toastService: ToastsService
  ) {}

  ngOnInit(): void {
    this.getAllDeleteTimeOff();
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
      .then(
        (result) => {
          if (result.isConfirmed) {
            this.timeOffService.destroyTimeOff(id).subscribe((data) => {
              this.toastService.show(data.message, {
                classname: 'bg-success text-light',
                delay: 3000,
              });
            });
            this.getAllDeleteTimeOff();
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            this.getAllDeleteTimeOff();
          }
        },
        (err: any) => {
          this.toastService.show(err.error.message, {
            classname: 'bg-danger text-light',
            delay: 3000,
          });
        }
      );
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
          this.timeOffService.restoreTimeOff(id, object).subscribe((data) => {
            this.toastService.show(data.message, {
              classname: 'bg-success text-light',
              delay: 3000,
            });
          });
          this.getAllDeleteTimeOff();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.getAllDeleteTimeOff();
        }
      });
  }
}
