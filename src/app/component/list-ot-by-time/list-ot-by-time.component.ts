import { Component, OnInit } from '@angular/core';
import { OTServiceService } from 'src/app/service/otservice.service';
import { ToastsService } from 'src/app/service/toasts.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-ot-by-time',
  templateUrl: './list-ot-by-time.component.html',
  styleUrls: ['./list-ot-by-time.component.css'],
})
export class ListOtByTimeComponent implements OnInit {
  listOT = [];
  listID = [];
  listIDDelete = [];
  checks = false;
  checkDelete = false;
  checkAllList = false;
  checkAllDelete = false;
  listOTDelete = [];
  loading = false;
  page = 1;
  pageSize;
  collectionSize;
  constructor(
    private otService: OTServiceService,
    private toastService: ToastsService
  ) {}

  ngOnInit(): void {
    this.listOtByLeader();
    this.getAllDeleteOT();
  }
  handlePaginate(event): void {
    this.loading = true;
    this.otService.paginateOT(String(event)).subscribe((data) => {
      this.listOtByLeader = data.data;
      this.loading = false;
    });
  }
  handlePaginate2(event): void {
    this.loading = true;
    this.otService.paginateOT(String(event)).subscribe((data) => {
      this.listOTDelete = data.data;
      this.loading = false;
    });
  }
  listOtByLeader() {
    this.otService.listOTByLeader().subscribe((data) => {
      console.log(data);

      this.listOT = data.data;
    });
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
          this.otService.deleteOT(id).subscribe(
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
          this.listOtByLeader();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.listOtByLeader();
        }
      });
  }
  listOtTooltip(tooltip, greeting: string) {
    if (tooltip.isOpen()) {
      tooltip.close();
    } else {
      tooltip.open({ greeting });
    }
  }
  getAllDeleteOT() {
    this.otService.getAllDeleteOT().subscribe((data) => {
      console.log(data);

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
      .then((result) => {
        if (result.isConfirmed) {
          this.otService.restorseOT(id, object).subscribe(
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
        }
      });
  }
  checkValue(e) {
    this.checkAllList = !this.checkAllList;
    if (e.target.checked == true) {
      this.checks = true;
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.listOT.length; i++) {
        this.listID.push(this.listOT[i].id);
      }
    } else {
      this.checks = false;
      this.listID = [];
    }
  }
  checkResult(e) {
    if (e.target.checked === true) {
      this.listID.push(parseInt(e.target.value));
    } else {
      const x = parseInt(e.target.value);
      const arr = this.listID.filter((data) => data !== x);
      this.listID = arr;
    }
  }
  checkValueDelete(e) {
    this.checkAllDelete = !this.checkAllDelete;
    if (e.target.checked == true) {
      this.checkDelete = true;
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.listOTDelete.length; i++) {
        this.listIDDelete.push(this.listOTDelete[i].id);
      }
    } else {
      this.checkDelete = false;
      this.listIDDelete = [];
    }
  }
  checkResultDelete(event) {
    if (event.target.checked === true) {
      this.listIDDelete.push(parseInt(event.target.value));
    } else {
      const x = parseInt(event.target.value);
      const arr = this.listIDDelete.filter((data) => data !== x);
      this.listIDDelete = arr;
    }
  }

  restoreAll() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: 'Bạn chắc chắn khôi phục tất cả',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'CÓ',
        cancelButtonText: 'Không',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.otService.restoreAll(this.listIDDelete).subscribe(
            (data) => {
              this.toastService.show(data.message, {
                classname: 'bg-success text-light',
                delay: 3000,
              }),
                this.getAllDeleteOT();
              this.checkAllDelete = false;
              this.checkDelete = false;
              this.listIDDelete = [];
            },
            (err: any) => {
              this.toastService.show(err.error.message, {
                classname: 'bg-danger text-light',
                delay: 3000,
              });
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.getAllDeleteOT();
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
        title: 'Bạn chắc chắn xóa tất cả',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'CÓ',
        cancelButtonText: 'Không',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.otService.destroyAll(this.listIDDelete).subscribe(
            (data) => {
              this.toastService.show(data.message, {
                classname: 'bg-success text-light',
                delay: 3000,
              });
              this.getAllDeleteOT();
              this.listIDDelete = [];
              this.checkAllDelete = false;
              this.checkDelete = false;
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
  deleteAll() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: 'Bạn chắc chắn xóa tất cả',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'CÓ',
        cancelButtonText: 'Không',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.otService.deleteAll(this.listID).subscribe(
            (data) => {
              this.toastService.show(data.message, {
                classname: 'bg-success text-light',
                delay: 3000,
              });
              this.listOtByLeader();
              this.checks = false;
              this.checkAllList = false;
              this.listID = [];
            },
            (err: any) => {
              this.toastService.show(err.error.message, {
                classname: 'bg-danger text-light',
                delay: 3000,
              });
            }
          );
          this.listOtByLeader();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.listOtByLeader();
        }
      });
  }
  reloadPage(event) {
    this.listOT;
  }
  reloadPageTrash(event) {
    this.getAllDeleteOT();
  }
}
