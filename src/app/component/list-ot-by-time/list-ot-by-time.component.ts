import { Component, OnInit } from '@angular/core';
import { OTServiceService } from 'src/app/service/otservice.service';
import { ToastsService } from 'src/app/service/toasts.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-ot-by-time',
  templateUrl: './list-ot-by-time.component.html',
  styleUrls: ['./list-ot-by-time.component.css']
})

export class ListOtByTimeComponent implements OnInit {

  listOT = [];
  listOTDelete = []
  constructor(private otService:OTServiceService,
    private toastService:ToastsService
  ) { }

  ngOnInit(): void {
    this.listOtByLeader();
    this.getAllDeleteOT()
  }
  listOtByLeader() {
    this.otService.listOTByLeader().subscribe((data) => {
      this.listOT = data.data
      console.log(this.listOT);

    })
  }
  handleDelete(id: string) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: 'Bạn có muốn xóa ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'CÓ',
        cancelButtonText: 'Không',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.otService.deleteOT(id).subscribe((data) => {
            console.log(data);
            this.toastService.show(data.message, {
              classname: 'bg-success text-light',
              delay: 3000
            }),
              (err: any) => {
                this.toastService.show(err.message, {
                  classname: 'bg-danger text-light',
                  delay: 3000
                })
              }
          })
          this.listOtByLeader()
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.listOtByLeader()
        }

      })
  }

  getAllDeleteOT() {
    this.otService.getAllDeleteOT().subscribe((data) => {
      console.log(data);
      this.listOTDelete = data.data
      console.log(this.listOTDelete);


    })
  }
  handleDestroy(id: string) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: 'Bạn chắc chắn xóa ?',
      text: "Không thể khôi phục dữ liệu sau khi xóa !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Có',
      cancelButtonText: 'Không',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.otService.destroyOT(id).subscribe((data) => {
          this.toastService.show(data.message, {
            classname: 'bg-success text-light',
            delay: 3000
          }),
            (err: any) => {
              this.toastService.show(err.message, {
                classname: 'bg-danger text-light',
                delay: 3000
              })
            }
        })
        this.getAllDeleteOT()
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.getAllDeleteOT()
      }
    })
  }
  handleRestore(id: string, object: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: 'Bạn chắc chắn khôi phục',
      text: "Khôi phục dữ liệu",
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Có',
      cancelButtonText: 'Không',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.otService.restorseOT(id, object).subscribe((data) => {
          this.toastService.show(data.message, {
            classname: 'bg-success text-light',
            delay: 3000
          }),
            (err: any) => {
              this.toastService.show(err.message, {
                classname: 'bg-danger text-light',
                delay: 3000
              })
            }

        })
        this.getAllDeleteOT()
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.getAllDeleteOT()
      }
    })
  }
}
