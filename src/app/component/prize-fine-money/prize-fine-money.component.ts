import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrizeFineMoneyService } from 'src/app/service/prize-fine-money.service';
import { ToastsService } from 'src/app/service/toasts.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-prize-fine-money',
  templateUrl: './prize-fine-money.component.html',
  styleUrls: ['./prize-fine-money.component.css'],
})
export class PrizeFineMoneyComponent implements OnInit {
  listAllDeletePrize = [];
  constructor(
    private prizeFineMoneyService: PrizeFineMoneyService,
    private router: Router,
    private toastService: ToastsService
  ) {}
  listID = [];
  listIDDelete = [];
  checkDelete = false;
  checks = false;
  list_prize_fine = [];
  keyword = '';
  loading = false;
  page = 1;
  pageSize: any;
  collectionSize: any;
  ngOnInit(): void {
    console.log(this.listID);

    this.search();
    this.getAllDeletePrize();
  }
  checkValue(e) {
    if (e.target.checked == true) {
      this.checks = true;
      for (let i = 0; i < this.list_prize_fine.length; i++) {
        this.listID.push(this.list_prize_fine[i].id);
        console.log(this.listID);
      }
    } else {
      this.checks = false;
      this.listID = [];
      console.log(this.listID);
    }
  }
  checkResult(event) {
    if (event.target.checked == true) {
      this.listID.push(parseInt(event.target.value));
      console.log(this.listID);
    } else {
      const x = parseInt(event.target.value);
      const arr = this.listID.filter((data) => data !== x);
      console.log('kp', arr);

      this.listID = arr;
      console.log(this.listID);
    }
  }
  checkValueDelete(e) {
    if (e.target.checked == true) {
      this.checkDelete = true;
      for (let i = 0; i < this.listAllDeletePrize.length; i++) {
        this.listIDDelete.push(this.listAllDeletePrize[i].id);
        console.log(this.listIDDelete);
      }
    } else {
      this.checkDelete = false;
      this.listIDDelete = [];
    }
  }
  checkResultDelete(e) {
    if (e.target.checked == true) {
      this.listIDDelete.push(parseInt(e.target.value));
    } else {
      const x = parseInt(e.target.value);
      const arr = this.listIDDelete.filter((data) => data !== x);
      this.listIDDelete = arr;
      console.log(this.listIDDelete);
    }
  }
  search(): void {
    this.prizeFineMoneyService.getAllPrize(this.keyword).subscribe((data) => {
      this.list_prize_fine = data.data;
      this.page = data.meta.currentPage;
      this.collectionSize = data.meta.total;
      this.pageSize = data.meta.perPage;
      console.log(this.keyword);
    });
  }
  handleDelete(id: string, index): void {
    this.prizeFineMoneyService.deletePrizeFine(id).subscribe((data) => {
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
            this.prizeFineMoneyService.deletePrizeFine(id).subscribe(
              (data) => {
                this.toastService.show(data.message, {
                  classname: 'bg-success text-light',
                  delay: 3000,
                });
              },
              (err: any) => {
                this.toastService.show(err.message, {
                  classname: 'bg-danger text-light',
                  delay: 3000,
                });
              }
            );
            this.search();
          } else if (result.dismiss === Swal.DismissReason.cancel) {
          }
        });
    });
  }

  handlePaginate(event): void {
    this.loading = true;
    this.prizeFineMoneyService
      .paginatePrize(String(event))
      .subscribe((data) => {
        this.list_prize_fine = data.data;
        this.loading = false;
      });
  }
  getAllDeletePrize() {
    this.prizeFineMoneyService.getAllDelete().subscribe((data) => {
      console.log(data);
      this.listAllDeletePrize = data.data;
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
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, destroy it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.prizeFineMoneyService.destroyPrize(id).subscribe((data) => {
            console.log(data);
            this.toastService.show(data.message, {
              classname: 'bg-success text-light',
              delay: 3000,
            }),
              (err: any) => {
                this.toastService.show(err.message, {
                  classname: 'bg-danger text-light',
                  delay: 3000,
                });
              };
          });
          this.getAllDeletePrize();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
      });
  }
  handeRestore(id: string, object: any) {
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
        text: 'you definitely want to restore !',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, restore it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.prizeFineMoneyService
            .restorePrize(id, object)
            .subscribe((data) => {
              console.log(data);
              this.toastService.show(data.message, {
                classname: 'bg-success text-light',
                delay: 3000,
              }),
                (err: any) => {
                  this.toastService.show(err.message, {
                    classname: 'bg-danger text-light',
                    delay: 3000,
                  });
                };
            });
          this.getAllDeletePrize();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
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
          this.prizeFineMoneyService
            .deleteAll(this.listID)
            .subscribe((data) => {
              this.toastService.show(data.message, {
                classname: 'bg-success text-light',
                delay: 3000,
              }),
                (err: any) => {
                  this.toastService.show(err.message, {
                    classname: 'bg-danger text-light',
                    delay: 3000,
                  });
                };
            });
          this.search();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.search();
        }
      });
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
        title: 'Bạn chắc chắn ?',
        text: 'Khôi phục tất cả dữ liệu',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Có',
        cancelButtonText: 'Không',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.prizeFineMoneyService
            .restoreAll(this.listIDDelete)
            .subscribe((data) => {
              this.toastService.show(data.message, {
                classname: 'bg-success text-light',
                delay: 3000,
              }),
                (err: any) => {
                  this.toastService.show(err.message, {
                    classname: 'bg-danger text-light',
                    delay: 3000,
                  });
                };
            });
          this.getAllDeletePrize();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
      });
  }
  destroyAllDelete() {
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
          this.prizeFineMoneyService
            .destroyAll(this.listIDDelete)
            .subscribe((data) => {
              this.toastService.show(data.message, {
                classname: 'bg-success text-light',
                delay: 3000,
              }),
                (err: any) => {
                  this.toastService.show(err.message, {
                    classname: 'bg-danger text-light',
                    delay: 3000,
                  });
                };
            });
          this.getAllDeletePrize();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
      });
  }
}
