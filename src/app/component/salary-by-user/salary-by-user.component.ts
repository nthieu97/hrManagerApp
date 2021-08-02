import { Component, OnInit } from '@angular/core';
import { SalaryService } from 'src/app/service/salary.service';
@Component({
  selector: 'app-salary-by-user',
  templateUrl: './salary-by-user.component.html',
  styleUrls: ['./salary-by-user.component.css']
})
export class SalaryByUserComponent implements OnInit {
  constructor(
    private salaryService:SalaryService,
        ) { }
  loading = false;
  salaUserData;
  page = 1;
  pageSize:any ;
  collectionSize:any;
  
  
  ngOnInit(): void {
    // this.id = this.route.snapshot.params['id']
    this.getSalaryUser();
  }

  getSalaryUser(){
    this.salaryService.getSalaryByUser().subscribe((data) => {      
        this.salaUserData = data.data;
        
        // this.page = data.meta;
      
        this.page = data.meta.currentPage;
        this.collectionSize = data.meta.total;
        this.pageSize = data.meta.perPage;
        // this.salaUser = data
       
        console.log(this.page);
        console.log(this.collectionSize);
        console.log(this.pageSize);
        console.log(data);  
    });
  }

  handlePaginate(event) {
    this.loading = true;
    this.salaryService
      .paginateSalary(String(event))
      .subscribe((data) => {
        this.salaUserData = data.data;
        this.loading = false;
      });
      // console.log(this.salaUser);
      
  }

}
