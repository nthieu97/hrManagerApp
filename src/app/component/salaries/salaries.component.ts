import { Component, OnInit } from '@angular/core';
import { SalaryService } from 'src/app/service/salary.service';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-salaries',
  templateUrl: './salaries.component.html',
  styleUrls: ['./salaries.component.css'],
})
export class SalariesComponent implements OnInit {
  salaries: any []
  isAdmin: boolean;
  pageIndex=1;
  collectionSize = 49;
  pageSize;
  pageDisplay:number = 10;
  keyword = '';
  paginateSalary;
  // loading:false;
  constructor(private salaryService:SalaryService,
    private authService:AuthService
    ) {}
  
  
  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    
    this.getSalaries();
  }
  getSalaries(){
    // console.log(this.pageIndex);
    // if(this.page == 1 ){
    //   this.skip = 0;
    // }else{
    //   this.skip = (this.page )* this.limit;
    // }
    // var request = {
    //   'limit' : this.limit,
    //   'skip' :this.skip

    // }
    // console.log(request);
 
    this.salaryService.getAllSalary().subscribe(data =>{
      // console.log(response);
        this.salaries = data.data;
    });
  
  }
  

}