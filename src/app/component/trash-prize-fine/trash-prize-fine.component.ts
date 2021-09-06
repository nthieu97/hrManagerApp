import { Component, OnInit } from '@angular/core';
import { PrizeFineMoneyService } from 'src/app/service/prize-fine-money.service';
import { ToastsService } from 'src/app/service/toasts.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-trash-prize-fine',
  templateUrl: './trash-prize-fine.component.html',
  styleUrls: ['./trash-prize-fine.component.css'],
})
export class TrashPrizeFineComponent implements OnInit {
  listAllDeletePrize = [];
  constructor(
    private prizeFineMoneyService: PrizeFineMoneyService,
    private toastService: ToastsService
  ) {}

  ngOnInit(): void {
    this.getAllDeletePrize();
  }
  getAllDeletePrize() {
    this.prizeFineMoneyService.getAllDelete().subscribe((data) => {
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
          this.prizeFineMoneyService.destroyPrize(id).subscribe(
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
          this.prizeFineMoneyService.restorePrize(id, object).subscribe(
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
          this.getAllDeletePrize();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
      });
  }
}
