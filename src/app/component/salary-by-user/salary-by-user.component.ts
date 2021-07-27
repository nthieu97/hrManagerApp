import { Component, OnInit } from '@angular/core';
import { SalaryService } from 'src/app/service/salary.service';

@Component({
  selector: 'app-salary-by-user',
  templateUrl: './salary-by-user.component.html',
  styleUrls: ['./salary-by-user.component.css']
})
export class SalaryByUserComponent implements OnInit {
// id:any;
salaUser:any[]
  constructor(
  
    private salaryService:SalaryService,
   ) { }

  ngOnInit(): void {
    // this.id = this.route.snapshot.params['id']
    this.getSalaryUser();
  }
  getSalaryUser(){
    this.salaryService.getSalaryByUser().subscribe(data=> {
      this.salaUser = data.data;
    })
  }

}
