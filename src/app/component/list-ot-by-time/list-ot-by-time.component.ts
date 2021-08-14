import { Component, OnInit } from '@angular/core';
import { OTServiceService } from 'src/app/service/otservice.service';

@Component({
  selector: 'app-list-ot-by-time',
  templateUrl: './list-ot-by-time.component.html',
  styleUrls: ['./list-ot-by-time.component.css']
})

export class ListOtByTimeComponent implements OnInit {
  listOT = []
  constructor(private otService:OTServiceService,
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
    this.otService.deleteOT(id).subscribe((data)=> {
      console.log(data);
      
    })
  }
}
