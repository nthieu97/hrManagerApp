import { Component, OnDestroy, OnInit } from '@angular/core';
import { Data, UserResponse } from 'src/app/model/user.model';
import { AuthService } from 'src/app/service/auth.service';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit, OnDestroy {
  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService
  ) {}
  loading = true;
  employees: Data[];
  loadingExpand = false;
  loadmore = 2;
  isAdmin = false;
  handleSearch(event): void {
    console.log(event.target.value);
  }
  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.employeeService.getAllEmployee().subscribe((data: UserResponse) => {
      this.employees = data.data;
      this.loading = false;
    });
  }
  handleLoadmore(): void {
    const page = String(this.loadmore);
    this.loadingExpand = true;
    console.log(page);
    this.employeeService
      .getAllEmployee(page)
      .subscribe((data: UserResponse) => {
        this.loadingExpand = false;
        this.employees.push(...data.data);
        this.loadmore += 1;
      });
  }
  ngOnDestroy(): void {}
}
