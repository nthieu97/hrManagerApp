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
  loading = false;
  salaryData;
  page = 1;
  pageSize;
  collectionSize = 5;
  idUser;
  keyword = '';
  // loading:false;
  constructor(private salaryService:SalaryService,
    private authService:AuthService
    ) {}
  
  
  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    
    this.getSalaries();
  }
  getSalaries(){
  
    this.salaryService.getAllSalary().subscribe(data =>{
      // console.log(response);
        this.salaryData = data.data;
        
        this.page = data.meta.currentPage;
        this.collectionSize = data.meta.total;
        this.pageSize = data.meta.perPage;
    });
  
  }
  handlePaginate(event) {
    this.loading = true;
    this.salaryService
      .paginateAttendance(String(event))
      .subscribe((data) => {
        this.salaryData = data.data;
        this.loading = false;
      });
  }
  

}