import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DepartmentService } from 'src/app/service/department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
})
export class DepartmentComponent implements OnInit {
  constructor(
    private departmentService: DepartmentService,
    private router: Router
  ) {}
  departments;
  ngOnInit(): void {
    this.search();
  }
  keyword: string = '';
  search() {
    this.departmentService.getAllDepartment(this.keyword).subscribe((data) => {
      this.departments = data.data;
      console.log(this.keyword);
      console.log(data);
    });
  }
  handleDelete(id: string, index): void {
    this.departmentService.deleteDepartment(id).subscribe(() => {
      console.log(id);
      this.departments.splice(index, 1);
    });
  }
}
