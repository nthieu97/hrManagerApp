import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';

import { EmployeeService } from 'src/app/service/employee.service';
import { DepartmentService } from 'src/app/service/department.service';
import { PositionService } from 'src/app/service/position.service';
import { EmployeeRequestBody } from 'src/app/model/employee.model';
@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
})
export class EmployeeFormComponent implements OnInit {
  positions = [];
  departments = [];
  newEmployeeForm!: FormGroup;
  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private positionService: PositionService,
    private departmentService: DepartmentService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.newEmployeeForm = this.fb.group({
      user_account: [
        '',
        [Validators.required, Validators.max(15), Validators.min(6)],
      ],
      email: ['', [Validators.required, Validators.email]],
      department: ['', [Validators.required]],
      position: ['', [Validators.required]],
      role_id: [3, [Validators.required]],
      address: ['', [Validators.required]],
      full_name: [
        '',
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(99),
        ],
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(12),
        ],
      ],
      avatar: [''],
      basic_salary: [7000000, [Validators.required]],
    });
    this.getDepartment();
    this.getPosition();
  }

  getPosition(): void {
    this.positionService.getAllPosition().subscribe((data) => {
      this.positions = data.data;
    });
  }

  getDepartment(): void {
    this.departmentService.getAllDepartment().subscribe((data) => {
      this.departments = data.data;
    });
  }
  submitForm(): void {
    const formValue = this.newEmployeeForm.value;
    const requestBody: EmployeeRequestBody = {
      user_account: formValue.user_account,
      full_name: formValue.full_name,
      email: formValue.email,
      department_id: Number(formValue.department),
      position_id: Number(formValue.position),
      role_id: formValue.role_id,
      phone: formValue.phone,
      basic_salary: formValue.basic_salary,
    };
    this.employeeService.store(requestBody).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err.message);
      }
    );
  }
}
