import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DepartmentService } from 'src/app/service/department.service';


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  constructor(
    private departmentService: DepartmentService,
    private router:Router

  ) { }
  departments;
  ngOnInit(): void {
    this.departmentService.getAllDepartment().subscribe((data) => {
      this.departments = data.data
    })
  }

  handleDelete(id: string, index): void {
    this.departmentService.deleteDepartment(id).subscribe(() => {
      console.log(id);
      this.departments.splice(index,1)
    })
  }

}