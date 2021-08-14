import { Component, OnInit } from '@angular/core';
import { TimeOffService } from 'src/app/service/time-off.service';

@Component({
  selector: 'app-trash-time-off',
  templateUrl: './trash-time-off.component.html',
  styleUrls: ['./trash-time-off.component.css']
})
export class TrashTimeOffComponent implements OnInit {
  listTimeOffDelete = []
  constructor(private timeOffService:TimeOffService) { }

  ngOnInit(): void {
    this.getAllDeleteTimeOff()
  }
  getAllDeleteTimeOff(){
    this.timeOffService.getAllDelete().subscribe((data)=> {
     
      this.listTimeOffDelete = data
      console.log(this.listTimeOffDelete);
    })
  }
  handleDestroy(id:string){
    this.timeOffService.destroyTimeOff(id).subscribe((data)=> {
      console.log(data);
      
    })
  }
  handleRestore(id:string,object:any){
    this.timeOffService.restoreTimeOff(id,object).subscribe((data)=> {
      console.log(data);
      
    })
  }
}
