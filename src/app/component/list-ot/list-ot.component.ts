import { Component, OnInit } from '@angular/core';
import { AttendanceService } from 'src/app/service/attendance.service';
import { OTServiceService } from 'src/app/service/otservice.service';
import { ToastsService } from 'src/app/service/toasts.service';
import Swal from 'sweetalert2';
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
    this.getAllListOT()
  }
  handlePaginate(event): void {
    this.loading = true;
    this.attenService.getListOT(String(event)).subscribe((data) => {
      this.listOT = data.data;
      this.loading = false;
    });
  }
  getAllListOT() {
    this.attenService.getListOT().subscribe((data) => {
      this.listOT = data.data;
      this.page = data.meta.currentPage;
      this.collectionSize = data.meta.total;
      this.pageSize = data.meta.perPage;
    });
  }
  handleChangeStatus(id: string) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: 'Bạn chắc chắn',
      text: "Cập nhật trạng thái",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Có',
      cancelButtonText: 'Không',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.attenService.updateStatus(id).subscribe((data) => {
          this.toastService.show('Cập nhật trạng thái thành công', {
            classname: 'bg-success text-light',
            delay: 3000
          }),
          this.getAllListOT()
        },
        (err:any)=> {
          this.toastService.show('Cập nhật trạng thái không thành công',{
             classname: 'bg-danger text-light',
            delay: 3000
          })
           this.getAllListOT()
        })

      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }

    })

  }
  listOtTooltip(tooltip, greeting: string) {
    if (tooltip.isOpen()) {
      tooltip.close();
    } else {
      tooltip.open({ greeting });
    }
  }
}
