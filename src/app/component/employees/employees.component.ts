import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
import { ToastsService } from 'src/app/service/toasts.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService,
    private departmentService: DepartmentService,
    private positionService: PositionService,
    private toastService: ToastsService
  ) {}
  noUser;
  loadFilter = false;
  loading = true;
  employees: Data[];
  loadingExpand = false;
  maxExpand: number;
  isAdmin = false;
  loadMoreButton = true;
  departments: Department[] = [];
  positions: Position[] = [];
  userParams: HttpParams;
  metaUser: {
    currentPage: number;
    pageSize: number;
    perPage: number;
  };
  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.userParams = new HttpParams();
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
    this.getAllEmployees();
  }
  getAllEmployees() {
    this.employeeService
      .getAllEmployee(this.userParams)
      .subscribe((data: UserResponse) => {
        this.employees = data.data;
        this.loading = false;
        this.userParams = this.userParams.append('page', '1');
        this.metaUser = {
          currentPage: data.meta.currentPage,
          pageSize: data.meta.total,
          perPage: data.meta.perPage,
        };
        this.maxExpandCaculate();
      });
  }
  // tinh so trang toi da
  maxExpandCaculate(): void {
    const pages = this.metaUser.pageSize / this.metaUser.perPage;
    if (pages <= 1) {
      this.loadMoreButton = false;
    } else if (this.metaUser.pageSize % this.metaUser.perPage > 0) {
      this.maxExpand = Math.floor(pages) + 1;
    } else {
      this.maxExpand = pages;
    }
  }
  setNewPage(): void {
    this.userParams = this.userParams.set('page', '1');
  }
  updateUserList(): void {
    this.setNewPage();
    this.employeeService.getAllEmployee(this.userParams).subscribe((data) => {
      this.loadFilter = false;
      this.employees = data.data;
      if (this.employees.length === 0) {
        this.loadMoreButton = false;
        this.noUser = 'Không có nhân viên nào';
      } else {
        this.noUser = undefined;
        this.loadMoreButton = true;
      }
      this.metaUser = {
        currentPage: data.meta.currentPage,
        pageSize: data.meta.total,
        perPage: data.meta.perPage,
      };
      this.maxExpandCaculate();
    });
  }
  handleSearch(event): void {
    this.loadFilter = true;
    const keyword = event.target.value;
    if (keyword === '') {
      this.userParams = this.userParams.delete('keyword');
    }

    if (this.userParams.has('keyword')) {
      this.userParams = this.userParams.set('keyword', keyword);
    } else {
      this.userParams = this.userParams.append('keyword', keyword);
    }
    this.updateUserList();
  }
  handleFilterDepartment(idDepartment): void {
    this.loadFilter = true;
    if (this.userParams.has('phongban')) {
      this.userParams = this.userParams.set('phongban', idDepartment);
    } else {
      this.userParams = this.userParams.append('phongban', idDepartment);
    }
    this.updateUserList();
  }

  handleFilterPosition(idPosition): void {
    this.loadFilter = true;

    if (!this.userParams.has('chucvu')) {
      this.userParams = this.userParams.append('chucvu', idPosition);
    } else {
      this.userParams = this.userParams.set('chucvu', idPosition);
    }
    this.updateUserList();
  }
  handleLoadmore(): void {
    const page = Number(this.userParams.get('page'));
    if (page === this.maxExpand) {
      this.loadMoreButton = false;
      return;
    }
    this.loadingExpand = true;
    this.userParams = this.userParams.set('page', String(page + 1));
    this.employeeService.getAllEmployee(this.userParams).subscribe((data) => {
      this.employees.push(...data.data);
      this.loadingExpand = false;
    });
  }
  refreshFilteredEmployees(): void {
    this.loadFilter = true;
    this.userParams = new HttpParams();
    this.updateUserList();
  }

  deleteUser(id) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: 'Bạn chắc chắn chứ ?',
        text: 'Đồng ý nhân viên thôi việc ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Có',
        cancelButtonText: 'Không',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.employeeService.deleteEmployee(id).subscribe(
            (data) => {
              this.toastService.show(data.message, {
                classname: 'bg-success text-light',
                delay: 3000,
              });
              this.getAllEmployees();
            },
            (err: any) => {
              this.toastService.show(err.error.message, {
                classname: 'bg-danger text-light',
                delay: 3000,
              });
            }
          );
          this.getAllEmployees();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
      });
  }
}
