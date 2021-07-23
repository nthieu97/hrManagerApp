import { Component, OnInit } from '@angular/core';
import { TimeOffService } from 'src/app/service/time-off.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-time-off',
  templateUrl: './time-off.component.html',
  styleUrls: ['./time-off.component.css']
})
export class TimeOffComponent implements OnInit {

  constructor(private timeOffService: TimeOffService,
  private router:Router) { }

  timeOff;
  ngOnInit(): void {
    this.timeOffService.getAllByUser().subscribe((data) => {
      this.timeOff = data.data
      console.log(data);
    })
  }
  handleDelete(id:string, index):void {
    this.timeOffService.deleteTimeOff(id).subscribe(() => {
      console.log(id);
      this.timeOff.splice(index,1)
    })
  }



}
