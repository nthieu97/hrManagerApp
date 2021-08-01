import { Component, OnInit } from '@angular/core';
import { SalaryService } from 'src/app/service/salary.service';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-salaries',
  templateUrl: './salaries.component.html',
  styleUrls: ['./salaries.component.css'],
})
export class SalariesComponent implements OnInit {
  
  isAdmin: boolean;
  loading=false;
  page=1;
  collectionSize = 5;
  pageSize;
  pageDisplay:number = 10;
  keyword = '';
  salaryData;
  
  // paginateSalary;
  // loading:false;
  constructor(private salaryService:SalaryService,
    private authService:AuthService
    ) {}
  
  
  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    
    this.paginateSalary();
  }
  
  paginateSalary(){
    this.salaryService.getAllSalary().subscribe((data) =>{
      // console.log(response);
        this.salaryData = data.data;
        this.page = data.meta.currentPage;
        this.collectionSize = data.meta.total;
        this.pageSize = data.meta.perPage;
    });
  
  }
  handlePaginate(event){
    this.loading = true;
    this.salaryService
      .paginateSalary(String(event))
      .subscribe((data) => {
        this.salaryData = data;
        console.log(data);
        this.loading = false;
      });

  }

}