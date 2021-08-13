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
  constructor(
    private prizeFineMoneyService: PrizeFineMoneyService,
    private router: Router,
    private toastService: ToastsService
  ) {}
  list_prize_fine = [];
  keyword = '';
  loading = false;
  page = 1;
  pageSize: any;
  collectionSize: any;
  ngOnInit(): void {
    this.search();
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
}
