import { Component, OnInit } from '@angular/core';
import { OTServiceService } from 'src/app/service/otservice.service';
import { ToastsService } from 'src/app/service/toasts.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-trash-ot',
  templateUrl: './trash-ot.component.html',
  styleUrls: ['./trash-ot.component.css'],
})
export class TrashOtComponent implements OnInit {
  listOTDelete = [];
  constructor(
    private toastService: ToastsService,
    private otService: OTServiceService
  ) {}

  ngOnInit(): void {
    this.getAllDeleteOT();
  }
  getAllDeleteOT() {
    this.otService.getAllDeleteOT().subscribe((data) => {
      this.listOTDelete = data.data;
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
        title: 'Bạn chắc chắn xóa ?',
        text: 'Không thể khôi phục dữ liệu sau khi xóa !',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Có',
        cancelButtonText: 'Không',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.otService.destroyOT(id).subscribe(
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
          this.getAllDeleteOT();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.getAllDeleteOT();
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
        title: 'Bạn chắc chắn khôi phục',
        text: 'Khôi phục dữ liệu',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Có',
        cancelButtonText: 'Không',
        reverseButtons: true,
      })
      .then(
        (result) => {
          if (result.isConfirmed) {
            this.otService.restorseOT(id, object).subscribe((data) => {
              this.toastService.show(data.message, {
                classname: 'bg-success text-light',
                delay: 3000,
              });
            });
            this.getAllDeleteOT();
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            this.getAllDeleteOT();
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
}
