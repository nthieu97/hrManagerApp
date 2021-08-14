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
  listOT = []
  constructor(private otService:OTServiceService,
    private toastService:ToastsService
  ) { }

  ngOnInit(): void {
    this.listOtByLeader();
  }
  listOtByLeader(){
    this.otService.listOTByLeader().subscribe((data)=> {   
      this.listOT = data.data
      console.log( this.listOT);
      
    })
  }
  handleDelete(id:string){
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
          this.otService.deleteOT(id).subscribe((data)=> {
            console.log(data);
            this.toastService.show(data.message,{
              classname:'bg-success text-light',
              delay:3000
            }),
            (err:any)=> {
              this.toastService.show(err.message,{
                classname:'bg-danger text-light',
                delay:3000
              })
            }
          })
          this.listOtByLeader()
        }else if(result.dismiss === Swal.DismissReason.cancel){
          this.listOtByLeader()
        }
   
  })
}
}
