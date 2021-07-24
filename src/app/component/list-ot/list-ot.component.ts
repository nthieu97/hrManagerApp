import { Component, OnInit } from '@angular/core';
import { AttendanceService } from 'src/app/service/attendance.service';

@Component({
  selector: 'app-list-ot',
  templateUrl: './list-ot.component.html',
  styleUrls: ['./list-ot.component.css']
})
export class ListOtComponent implements OnInit {
  listOT=[]
  constructor(private attenService:AttendanceService) { }

  ngOnInit(): void {
    this.attenService.getListOT().subscribe((data) => {
      console.log(data);
      this.listOT = data.data
    })
  }

}
