import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Department,
  ResponseAllDepartment,
} from 'src/app/model/department.model';
import { Position, ResponeAllPosition } from 'src/app/model/position.model';
import { Data, UserResponse } from 'src/app/model/user.model';
import { AuthService } from 'src/app/service/auth.service';
import { DepartmentService } from 'src/app/service/department.service';
import { EmployeeService } from 'src/app/service/employee.service';
import { PositionService } from 'src/app/service/position.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit, OnDestroy {
  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService,
    private departmentService: DepartmentService,
    private positionService: PositionService
  ) {}
  loading = true;
  employees: Data[];
  loadingExpand = false;
  maxExpand;
  loadmore = 2;
  isAdmin = false;
  loadMoreButton = true;
  departments: Department[] = [];
  positions: Position[] = [];
  handleSearch(event): void {
    console.log(event.target.value);
  }
  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.departmentService
      .getAllDepartment()
      .subscribe((res: ResponseAllDepartment) => {
        this.departments = res.data;
      });
    this.positionService
      .getAllPosition()
      .subscribe((res: ResponeAllPosition) => {
        this.positions = res.data;
      });
    this.employeeService.getAllEmployee().subscribe((data: UserResponse) => {
      this.employees = data.data;
      this.loading = false;
      const pageNumber = data.meta.total / data.meta.perPage;
      if (data.meta.total % data.meta.perPage > 0) {
        this.maxExpand = Math.floor(pageNumber) + 1;
      } else {
        this.maxExpand = pageNumber;
      }
    });
  }
  handleFilterDepartment(event) {
    console.log(event);
  }
  handleFilterPosition(id) {
    console.log(id);
  }
  handleLoadmore(): void {
    const page = String(this.loadmore);
    this.loadingExpand = true;
    if (this.loadmore <= this.maxExpand) {
      this.employeeService
        .getAllEmployee(page)
        .subscribe((data: UserResponse) => {
          this.loadingExpand = false;
          this.employees.push(...data.data);
          this.loadmore += 1;
        });
      return;
    }
    this.loadMoreButton = false;
    return;
  }
  ngOnDestroy(): void {}
}
