import { Component, OnInit } from '@angular/core';
import { TimeOffService } from 'src/app/service/time-off.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastsService } from 'src/app/service/toasts.service';
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
    let conf = confirm("you definitely want to delete")
    if(conf){
      this.timeOffService.deleteTimeOff(id).subscribe((data) => {
        this.toastService.show(data.message,{
          classname:'bg-success text-light',
          delay:3000
        }),
        (err:any)=>{
          this.toastService.show(err.message,{
            classname:'bg-danger text-light',
            delay:3000
          })
        }
        this.getAllTimeOff()
        // console.log(id);
        // this.timeOff.splice(index, 1);
      });
    }
    
  }
}
