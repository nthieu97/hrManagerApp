import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  ConfirmListResponse,
  ConfirmResponse,
} from 'src/app/model/dashboard.model';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/service/auth.service';
import { DashboardService } from 'src/app/service/dashboard.service';
import { ToastsService } from 'src/app/service/toasts.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  single: any[];
  multi = [];
  xAxisLabel = 'Tháng';
  yAxisLabel = 'Lương nhân viên ';
  timeline = true;
  // options
  view = [300, 350];
  viewSalary = [750, 550];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };

  dataUserByDepartment = [];
  isAdmin: boolean;
  confirmList: ConfirmResponse[] = [];
  loadListConfirm = false;
  totalUsers: number;
  totalUserWorker: number;
  totalUsersOff: number;
  departments: number;
  constructor(
    private authService: AuthService,
    private dashboardService: DashboardService,
    private toastService: ToastsService
  ) {}
  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    if (this.isAdmin) {
      this.loadListConfirm = true;
      this.dashboardService
        .showListConfirm()
        .subscribe((data: ConfirmListResponse) => {
          this.confirmList = data.data;
          this.loadListConfirm = false;
        });
      this.dashboardService.getSalaryByMonth().subscribe((data) => {
        const luong = data.data.map((month) => {
          const tungThang = month.series.map((serie) => {
            return { name: serie.date, value: serie.luong };
          });
          return { name: month.name, series: tungThang };
        });
        this.multi = luong;
      });
      this.dashboardService.getTotalUserByDepartment().subscribe((data) => {
        const department = data.data;
        const userByDepartment = department.map((departmentInfo) => {
          return {
            name: departmentInfo.phongban_userinfo.name,
            value: departmentInfo.total_user,
          };
        });
        this.dataUserByDepartment = userByDepartment;
      });
      this.dashboardService.getTotalUser().subscribe((data) => {
        this.totalUsers = data.data[0].so_luong_user;
      });
      this.dashboardService.getTotalUserWorker().subscribe((data) => {
        this.totalUserWorker = data.data[0].nhan_vien_di_lam;
      });
      this.dashboardService.getAllDepartment().subscribe((data) => {
        this.departments = data.data[0].so_luong_phong_ban;
      });
      this.dashboardService.getTotalUserOff().subscribe((data) => {
        this.totalUsersOff = data.data[0].nhan_vien_nghi_lam;
      });
    }
  }

  handleAprove(id: string, index): void {
    this.dashboardService.acceptLeave(id).subscribe((data) => {
      this.toastService.show(data.message, {
        classname: 'bg-success text-light',
        delay: 3000,
      });
      this.confirmList.splice(index, 1);
    });
  }
  handleReject(id: string, index): void {
    this.dashboardService.rejectLeave(id).subscribe((data) => {
      this.toastService.show(data.message, {
        classname: 'bg-success text-light',
        delay: 3000,
      });
      this.confirmList.splice(index, 1);
    });
  }
}
