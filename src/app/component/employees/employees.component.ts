import { Component, OnDestroy, OnInit } from '@angular/core';
import { Data, UserResponse } from 'src/app/model/user.model';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit, OnDestroy {
  constructor(private employeeService: EmployeeService) {}
  loading = true;
  employees: Data[];
  handleSearch(event): void {
    console.log(event.target.value);
  }

  ngOnInit(): void {
    this.employeeService.getAllEmployee().subscribe((data: UserResponse) => {
      this.employees = data.data;
      this.loading = false;
    });
  }
  ngOnDestroy(): void {}
}
