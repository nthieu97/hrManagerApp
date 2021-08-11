import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PositionService } from 'src/app/service/position.service';
import { ToastsService } from 'src/app/service/toasts.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css'],
})
export class PositionsComponent implements OnInit {
  constructor(
    private positionService: PositionService,
    private router: Router,
    private toastService: ToastsService
  ) {}
  positions;

  ngOnInit(): void {
    this.getAllPosition();
  }
  getAllPosition() {
    this.positionService.getAllPosition().subscribe((data) => {
      this.positions = data.data;
    });
  }
  handleDelete(id: string, index): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.positionService.deletePosition(id).subscribe((data) => {
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
        this.getAllPosition()
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
      }
    })
  }
}
