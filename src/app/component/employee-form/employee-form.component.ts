import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { EmployeeService } from 'src/app/service/employee.service';
import { DepartmentService } from 'src/app/service/department.service';
import { PositionService } from 'src/app/service/position.service';
@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
})
export class EmployeeFormComponent implements OnInit {
  positions = [];
  departments = [];
  employeeForm: FormGroup;
  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private positionService: PositionService,
    private departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    this.employeeForm = new FormGroup({
      name: new FormControl(),
      address: new FormControl(),
      positionId: new FormControl(),
      departmentId: new FormControl(),
      peopleID: new FormControl(),
      gender: new FormControl(),
      email: new FormControl(),
    });

    this.getPosition(), this.getDepartment();
  }
  createForm() {}
  getPosition() {
    this.positionService.getAllPosition().subscribe((data) => {
      console.log(data.data);
      this.positions = data.data;
    });
  }
  keyword: string = '';
  getDepartment() {
    this.departmentService.getAllDepartment(this.keyword).subscribe((data) => {
      console.log(data.data);
      this.departments = data.data;
    });
  }

  get f() {
    return this.employeeForm.controls;
  }

  submitForm($event) {
    event.preventDefault();
    this.employeeService.store(this.employeeForm.value).subscribe((data) => {
      console.log(this.employeeForm.value, data);
    });
  }
}
