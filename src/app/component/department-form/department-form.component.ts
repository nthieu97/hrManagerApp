import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseDepartment } from 'src/app/model/department.model';
import { DepartmentService } from 'src/app/service/department.service';
import { ToastsService } from 'src/app/service/toasts.service';

export class Department {
  public nameDepartment: string;
}
@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css'],
})
export class DepartmentFormComponent implements OnInit {
  model = new Department();
  constructor(
    private departmentService: DepartmentService,
    private router: Router,
    private atr: ActivatedRoute,
    private toastService:ToastsService
  ) {}
  nameDepartment: string;
  idDepartment: string;

  ngOnInit(): void {
    this.atr.params.subscribe((params) => {
      console.log(params);

      this.idDepartment = params.id;
      if (this.idDepartment) {
        this.departmentService
          .getDepartment(this.idDepartment)
          .subscribe((data: ResponseDepartment) => {
            this.model.nameDepartment = data.data.name;
            console.log(this.model.nameDepartment);
          });
      }
    });
  }
  handleSubmit(value): void {
    const name = value.name;
    console.log(name);
    if (this.idDepartment && name !== '') {
      this.departmentService
        .updateDepartment(this.idDepartment, name)
        .subscribe((data) => {
          this.toastService.show(data.message,{
            classname:'bg-success text-light',
            delay:3000
          }),
          (err:any) => {
            this.toastService.show(err.message,{
              classname:'bg-danger text-light',
              delay:3000
            })
          }
          this.router.navigate(['/', 'departments']);
        });
      return;
    }
    this.departmentService.createDepartment(name).subscribe((data) => {
      this.toastService.show('Thêm Phòng Ban Thành Công',{
        classname:'bg-success text-light',
        delay:3000
      }),
      (err:any) => {
        this.toastService.show(err.message,{
          classname:'bg-danger text-light',
          delay:3000
        })
      }
      this.router.navigate(['/', 'departments']);
    });

    if (name === '') {
      console.log('error');
    }
  }
}
