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
  constructor(private timeOffService: TimeOffService, private router: Router,private toastService:ToastsService) {}

  timeOff;
  ngOnInit(): void {
    this.getAllTimeOff()
  }
  getAllTimeOff(){
    this.timeOffService.getAllByUser().subscribe((data) => {
      this.timeOff = data.data;
      console.log(data);
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
        this.timeOffService.deleteTimeOff(id).subscribe((data) => {
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
        this.getAllTimeOff()
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
      }
    })
    
  }
}
