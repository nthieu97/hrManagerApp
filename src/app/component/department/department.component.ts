import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastsService } from 'src/app/service/toasts.service';
import {
  Department,
  ResponseAllDepartment,
} from 'src/app/model/department.model';
import { DepartmentService } from 'src/app/service/department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
})
export class DepartmentComponent implements OnInit {
  constructor(
    private departmentService: DepartmentService,
    private router: Router,
    private toatsService:ToastsService
  ) {}
  departments: Department[] = [];

  ngOnInit(): void {
      this.getAllDepartment()
  }
  getAllDepartment(){
    this.departmentService
      .getAllDepartment()
      .subscribe((data: ResponseAllDepartment) => {
        this.departments = data.data;
      });
  }
  handleDelete(id: string, index): void {
    let conf = confirm("you definitely want to delete")
    if(conf){
      this.departmentService.deleteDepartment(id).subscribe((data) => {
      this.toatsService.show(data.message,{
        classname:'bg-success text-light',
        delay:3000
      }),
      (err:any) => {
        this.toatsService.show(err.message,{
          classname:'bg-danger text-light',
          delay:3000
        })
      }
      this.getAllDepartment()
      // console.log(id);
      // this.departments.splice(index, 1);
    });
  }
  }
}
