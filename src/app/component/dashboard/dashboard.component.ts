import { Component, OnInit } from '@angular/core';
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
  data = [
    {
      name: 'developer',
      value: 10,
    },
    { name: 'designner', value: 2 },
    { name: 'BA', value: 1 },
  ];
  isAdmin: boolean;
  confirmList: ConfirmResponse[] = [];
  loadListConfirm = false;
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
    }
  }
  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
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
